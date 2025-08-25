import { gql } from '@apollo/client';

export const GET_ALL_ADVERTISERS = gql`
  query GetAllAdvertisers(
    $page: Int!
    $pageSize: Int!
    $statusId: String
    $categoryIds: [AdvertiserCategoryEnum!]
  ) {
    advertisers(
      page: $page
      pageSize: $pageSize
      statusId: $statusId
      categoryIds: $categoryIds
    ) {
      id
      name
      slug
      logo {
        id
        url
      }
      categories {
        id
        name
        description
      }
      commission(statusId: Active, rowStatusId: Active) {
        calculatedCommission
      }
    }
    advertisersPagination(
      page: $page
      pageSize: $pageSize
      statusId: $statusId
      categoryIds: $categoryIds
    ) {
      nextPage
      currentPage
    }
  }
`;
