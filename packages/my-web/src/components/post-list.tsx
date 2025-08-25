"use client";

import { PostListQuery } from "@/services/graphql";
import { gql, useQuery } from "@apollo/client";
import { PostItem } from "@tekminewe/mint-ui/post-item";
import { Skeleton } from "@tekminewe/mint-ui/skeleton";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const QUERY = gql(/* GraphQL */ `
  query PostList($page: Int!, $pageSize: Int!) {
    posts(page: $page, pageSize: $pageSize, statusId: "Published") {
      id
      title
      content
      slug
      postDate
      featuredImage {
        url
      }
      tags {
        name
      }
      editorVersion
    }
    postsPagination(page: $page, pageSize: $pageSize, statusId: "Published") {
      totalItems
      pageSize
      nextPage
      currentPage
    }
  }
`);

export const PostList = ({ languageId }: { languageId: string }) => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<PostListQuery>(QUERY, {
    variables: {
      page,
      pageSize: 15,
    },
    context: {
      headers: {
        "Accept-Language": languageId,
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  });

  if (loading || !data) {
    return (
      <div className="space-y-8">
        <Skeleton width="100%" height="256px" />
        <Skeleton width="100%" height="256px" />
      </div>
    );
  }

  const posts = data.posts;
  const pagination = data.postsPagination;

  return (
    <InfiniteScroll
      dataLength={posts.length}
      hasMore={!!pagination.nextPage}
      loader={<h4>Loading...</h4>}
      next={() => {
        setPage((page) => page + 1);
      }}
      className="space-y-8"
    >
      {posts.map((post) => {
        let summary = "";
        if (post.editorVersion === 1) {
          summary = JSON.parse(post.content)
            .content[0].content.map((c: { text: string }) => c.text)
            .join(" ")
            .substring(0, 200)
            .concat("...");
        } else {
          const firstParagrah =
            post.content?.match(/<p[^>]*>([^<]+)<\/p>/)?.[0];
          summary =
            firstParagrah
              ?.replace(/<[^>]*>/g, "")
              .substring(0, 200)
              .concat("...") ?? "";
        }

        return (
          <Link
            key={post.id}
            href={`/${languageId}/blog/${post.slug}`}
            passHref
            legacyBehavior
          >
            <PostItem
              title={post.title}
              summary={summary ?? ""}
              date={dayjs(post.postDate).format("MMMM DD, YYYY")}
              imageUrl={
                post.featuredImage?.url ?? "/assets/images/placeholder.webp"
              }
              tags={post.tags?.map((tag) => tag.name) ?? []}
            />
          </Link>
        );
      })}
    </InfiniteScroll>
  );
};
