import { gql } from "@apollo/client";

export const UPDATE_POST = gql(/* GraphQL */ `
  mutation AdminUpdatePost($id: String!, $data: UpdatePostInput!) {
    updatePost(id: $id, data: $data) {
      id
      title
      content
      postDate
      slug
      description
      editorVersion
      status {
        id
        name
      }
      tags {
        id
        name
      }
      featuredImage {
        id
        url
      }
    }
  }
`);
