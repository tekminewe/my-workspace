import { gql } from "@apollo/client";

export const EDIT_CAROUSEL_QUERY = gql`
  query EditCarouselQuery(
    $id: String!
    $page: Int!
    $pageSize: Int!
    $statusId: String
  ) {
    carousel(id: $id) {
      id
      title
      startDate
      endDate
      status
      cta {
        ... on CarouselCtaLink {
          type
          payload {
            link
          }
        }
        ... on CarouselCtaCashback {
          type
          payload {
            advertiserId
          }
        }
      }
      metadatas {
        image {
          id
          url
        }
        languageId
      }
    }
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
