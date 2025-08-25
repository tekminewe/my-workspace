import { query } from "@/services/apollo-client-server";
import { PostListSitemapQuery } from "@/services/graphql";
import { client } from "@/services/client";
import type { MetadataRoute } from "next";
import { POST_LIST_SITEMAP } from "@/graphql/queries/post-list-sitemap";

export async function generateSitemaps() {
  return [{ id: "main" }, { id: "store-0" }, { id: "blog-0" }];
}

const staticPages: MetadataRoute.Sitemap = [
  {
    url: "",
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 1,
  },
  {
    url: "/all-stores",
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 1,
  },
  {
    url: "/blog",
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 1,
  },
  {
    url: "/privacy-policy",
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: 0.5,
  },
  {
    url: "/terms-and-conditions",
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: 0.5,
  },
];

const getStoreSitemap = async ({
  mainLocale,
  otherLocales,
}: {
  mainLocale: string;
  otherLocales: string[];
}): Promise<MetadataRoute.Sitemap> => {
  const stores = await client.affiliate.getAllAdvertisers({
    pageSize: 5000,
    page: 1,
  });

  return stores.data.data.map((store) => ({
    url: `${process.env.SITE_DOMAIN}/${mainLocale}/store/${store.slug}`,
    changeFrequency: "weekly",
    lastModified: store.updatedAt,
    alternates: {
      languages: otherLocales.reduce<Record<string, string>>((acc, locale) => {
        acc[
          locale
        ] = `${process.env.SITE_DOMAIN}/${locale}/store/${store.slug}`;
        return acc;
      }, {}),
    },
    priority: 1,
  }));
};

const getPostSitemap = async ({
  mainLocale,
}: // otherLocales,
{
  mainLocale: string;
  otherLocales: string[];
}): Promise<MetadataRoute.Sitemap> => {
  const { data } = await query<PostListSitemapQuery>({
    query: POST_LIST_SITEMAP,
    context: {
      headers: {
        "Accept-Language": mainLocale,
      },
    },
  });
  return data.posts.map((post) => ({
    url: `${process.env.SITE_DOMAIN}/${mainLocale}/blog/${post.slug}`,
    changeFrequency: "weekly",
    lastModified: post.updatedAt,
    priority: 1,
  }));
};

export default async function sitemap({
  id,
}: {
  id: string;
}): Promise<MetadataRoute.Sitemap> {
  const locales = process.env.ALLOWED_LOCALES?.split(",") ?? [];
  const mainLocale = locales.find((locale) => locale.includes("en")) ?? "en-US";
  const otherLocales = locales.filter((locale) => !locale.includes("en"));

  if (id.startsWith("store")) {
    return getStoreSitemap({ mainLocale, otherLocales });
  } else if (id.startsWith("blog")) {
    return getPostSitemap({ mainLocale, otherLocales });
  } else {
    return [
      ...staticPages.map(({ url, ...page }) => ({
        ...page,
        url: `${process.env.SITE_DOMAIN}/${mainLocale}${url}`,
        alternates: {
          languages: otherLocales.reduce<Record<string, string>>(
            (acc, locale) => {
              acc[locale] = `${process.env.SITE_DOMAIN}/${locale}${url}`;
              return acc;
            },
            {}
          ),
        },
      })),
    ];
  }
}
