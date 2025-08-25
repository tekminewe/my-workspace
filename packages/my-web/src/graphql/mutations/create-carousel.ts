import { gql } from "@apollo/client";

export const CREATE_CAROUSEL = gql(/* GraphQL */ `
  mutation AdminCreateCarousel($data: CreateCarouselInput!) {
    createCarousel(data: $data) {
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
