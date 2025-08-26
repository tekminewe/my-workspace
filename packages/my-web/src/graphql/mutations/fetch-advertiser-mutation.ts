import { gql } from "@apollo/client";

export const FETCH_ADVERTISER_MUTATION = gql`
  mutation FetchAdvertiser($data: FetchAdvertiserInput!) {
    fetchAdvertiser(data: $data) {
      success
      advertiserName
      slug
      message
    }
  }
`;
