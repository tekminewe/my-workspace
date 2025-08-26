import { gql } from "@apollo/client";

export const GET_ADMIN_CAROUSEL_LIST = gql(/* GraphQL */ `
  query GetAdminCarouselList($page: Int!, $pageSize: Int!) {
    carousels(page: $page, pageSize: $pageSize) {
      id
      title
      startDate
      endDate
      status
      image {
        id
        url
      }
    }
    carouselsPagination(page: $page, pageSize: $pageSize) {
      totalItems
      pageSize
      currentPage
    }
  }
`);
