import { gql } from "@apollo/client";

export const GET_HOME = gql(/* GraphQL */ `
  query GetHome {
    carousels(page: 1, pageSize: 10, status: "Active") {
      id
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
            advertiserSlug
            advertiserRedirectUrl
            advertiserName
            advertiserLogoUrl
            advertiserCashbackRate
          }
        }
      }
      image {
        id
        url
      }
    }
  }
`);
