import { gql } from "@apollo/client";

export const ADMIN_CAROUSEL_DETAIL_PAGE_QUERY = gql(/* GraphQL */ `
  query AdminCarouselDetailPageQuery($id: String!) {
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
  }
`);
