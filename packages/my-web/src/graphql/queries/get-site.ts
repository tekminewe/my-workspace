import { gql } from "@apollo/client";

export const GET_SITE = gql`
  query GetSite {
    site {
      id
      name
      domain
      description
      logo {
        url
      }
      createdAt
      updatedAt
    }
  }
`;
