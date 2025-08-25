import { notFound } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PreviewV0 } from "@/components/preview.v0";
import { PreviewV1 } from "@/components/preview.v1";
import { Metadata } from "next";
import { ServerComponentProps } from "@/types";
import { query } from "@/services/apollo-client-server";
import { PostDetailQuery } from "@/services/graphql";
import { POST_DETAIL } from "@/graphql/queries/post-detail";

dayjs.extend(relativeTime);

type IBlogPageProps = ServerComponentProps<{
  params: Promise<{
    slug: string;
  }>;
}>;

export async function generateMetadata({
  params,
}: IBlogPageProps): Promise<Metadata> {
  try {
    const { slug, lang } = await params;
    const response = await query<PostDetailQuery>({
      query: POST_DETAIL,
      variables: {
        slug,
      },
      context: {
        headers: {
          "Accept-Language": lang,
        },
      },
    });
    const post = response.data.post;

    if (!post) {
      return {
        title: "Post not found",
      };
    }

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description ?? "",
        images: [
          {
            url: post.featuredImage?.url ?? "",
            alt: post.title,
            width: 1200,
            height: 630,
          },
        ],
        // siteName: "tekminewe.com", // TODO: should be dynamic
        type: "article",
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        // authors: ["Tek Min Ewe"], // TODO: should be dynamic
      },
    };
  } catch (err) {
    return {
      title: "Error",
      description: "Something went wrong",
    };
  }
}

export async function PostPage({ params }: IBlogPageProps) {
  const { slug } = await params;
  let post;
  try {
    const response = await query<PostDetailQuery>({
      query: POST_DETAIL,
      variables: {
        slug,
      },
    });

    post = response.data.post;

    if (!post) {
      notFound();
    }
  } catch (err) {
    console.error(err);
    notFound();
  }

  if (post.editorVersion === 0) {
    return <PreviewV0 post={post} />;
  }

  return <PreviewV1 post={post} />;
}
