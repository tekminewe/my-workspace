import { gql } from "@apollo/client";

export const REFRESH_ADVERTISER_SEARCH_INDEX = gql(/* GraphQL */ `
  mutation RefreshAdvertiserSearchIndex(
    $data: RefreshAdvertiserSearchIndexInput!
  ) {
    refreshAdvertiserSearchIndex(data: $data) {
      success
    }
  }
`);
