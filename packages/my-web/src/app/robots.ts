import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/profile/", "/withdrawal/", "/admin/"],
    },
    sitemap: `${process.env.SITE_DOMAIN}/sitemap.xml`,
  };
}
