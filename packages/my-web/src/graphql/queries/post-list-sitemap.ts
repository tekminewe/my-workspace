import { gql } from "@apollo/client";

export const POST_LIST_SITEMAP = gql(/* GraphQL */ `
  query PostListSitemap {
    posts(pageSize: 5000, statusId: "Published") {
      id
      title
      postDate
      slug
      updatedAt
    }
  }
`);
