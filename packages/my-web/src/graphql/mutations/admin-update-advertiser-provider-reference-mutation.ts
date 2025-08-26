import { gql } from "@apollo/client";

export const ADMIN_UPDATE_ADVERTISER_PROVIDER_REFERENCE_MUTATION =
  gql(/* GraphQL */ `
    mutation AdminUpdateAdvertiserProviderReference(
      $advertiserId: String!
      $providerId: AffiliateProviderEnum!
      $providerReferenceId: String!
    ) {
      updateAdvertiserProviderReference(
        input: {
          advertiserId: $advertiserId
          providerId: $providerId
          providerReferenceId: $providerReferenceId
        }
      ) {
        advertiserId
        providerId
        providerReferenceId
      }
    }
  `);
