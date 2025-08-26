import { gql } from '@apollo/client';

export const GET_ADVERTISER_CATEGORIES = gql`
  query GetAdvertiserCategories {
    advertiserCategories {
      id
      name
      description
    }
  }
`;
