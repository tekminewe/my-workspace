import { gql } from "@apollo/client";

export const UPDATE_CAROUSEL = gql(/* GraphQL */ `
  mutation AdminUpdateCarousel($id: String!, $data: UpdateCarouselInput!) {
    updateCarousel(id: $id, data: $data) {
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
