import { gql } from "@apollo/client";

export const GET_SITE_AND_ADVERTISER = gql`
  query GetSiteAndAdvertiser($slug: String!) {
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
    advertiser(slug: $slug) {
      id
      name
      slug
      description
      statusId
      createdAt
      updatedAt
      logo {
        id
        url
      }
      commission {
        calculatedCommission
        dayToValidate
        dayToPayout
        url
      }
    }
  }
`;
