import { gql } from "@apollo/client";

export const GET_SITE_AND_ADVERTISERS = gql`
  query GetSiteAndAdvertisers($page: Int!, $pageSize: Int!, $statusId: String) {
    languages(isSupported: true) {
      id
      name
    }
    advertisers(page: $page, pageSize: $pageSize, statusId: $statusId) {
      id
      name
      slug
      description
      logo {
        id
        url
      }
      createdAt
      updatedAt
    }
    advertisersPagination(
      page: $page
      pageSize: $pageSize
      statusId: $statusId
    ) {
      totalItems
      totalPages
    }
  }
`;
