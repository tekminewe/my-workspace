import { gql } from "@apollo/client";

export const POST_DETAIL = gql(/* GraphQL */ `
  query PostDetail($slug: String!) {
    post(slug: $slug) {
      id
      title
      content
      description
      slug
      postDate
      createdAt
      updatedAt
      featuredImage {
        url
      }
      tags {
        name
      }
      editorVersion
    }
  }
`);
