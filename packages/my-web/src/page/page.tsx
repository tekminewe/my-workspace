import { Metadata } from "next";
import { getPage } from "@/services/page";
import { ServerComponentProps } from "@/types";

import type { JSX } from "react";

const pathMap: Record<
  string,
  Record<
    string,
    {
      generateMetaData?: (options: { params: any }) => Promise<Metadata>;
      Component: (options: {
        params: any;
      }) => Promise<JSX.Element> | JSX.Element;
    }
  >
> = {};

interface Params {
  tenantId: string;
  slug?: string[];
}

const matchPathname = ({ params }: { params: Params }) => {
  const pathname = "/" + (params.slug?.join("/") ?? "");
  let pathMatch = pathMap[params.tenantId]?.[pathname];

  let newParams: object = {};
  if (!pathMatch) {
    for (const path in pathMap[params.tenantId]) {
      const pathRegex = new RegExp(
        "^" + path.replace(/\[([^\]]+)\]/g, "(?<$1>[^/]+)") + "$"
      );
      const match = pathname.match(pathRegex);
      if (match) {
        const dynamicParams = path
          .match(/\[([^\]]+)\]/g)
          ?.reduce((acc, param, index) => {
            const key = param.replace(/[\[\]]/g, "");
            acc[key] = match[index + 1];
            return acc;
          }, {} as Record<string, string>);
        pathMatch = pathMap[params.tenantId][path];
        newParams = { ...params, ...dynamicParams };
        break;
      }
    }
  }

  return { match: pathMatch, newParams, pathname };
};

export const generateMetadata = async (
  props: ServerComponentProps<{
    params: Promise<Params>;
  }>
): Promise<Metadata> => {
  const params = await props.params;
  const { match, newParams, pathname } = matchPathname({ params });
  const generateMetaData = match?.generateMetaData;
  if (generateMetaData) {
    return generateMetaData({ params: newParams });
  }

  let slug = pathname.replaceAll("/", "-");
  if (slug === "/") {
    slug = "home";
  }
  const result = await getPage(slug);
  if (!result.ok()) {
    return {};
  }

  return {
    title: result.data.title,
    description: result.data.description,
    openGraph: {
      publishedTime: result.data.createdAt,
      modifiedTime: result.data.updatedAt,
      title: result.data.title,
      description: result.data.description,
      locale: params.lang,
    },
  };
};

export const DynamicPage = ({ params }: { params: Params }) => {
  const { match, newParams } = matchPathname({ params });
  let Component = match?.Component;

  if (!Component) {
    return <div>Not Found</div>;
  }

  return <Component params={newParams} />;
};
