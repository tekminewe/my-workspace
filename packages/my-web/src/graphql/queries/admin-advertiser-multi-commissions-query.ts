import { gql } from '@apollo/client';

export const ADMIN_ADVERTISER_MULTI_COMMISSIONS_QUERY = gql(/* GraphQL */ `
  query AdminAdvertiserMultiCommissionsQuery($id: String!) {
    advertiser(advertiserId: $id) {
      id
      name
      slug
      logo {
        id
        url
      }
      statusId
      metadatas {
        languageId
        name
        description
      }
      commissions {
        id
        dayToValidate
        dayToPayout
        url
        statusId
        providerId
        commissionRows {
          id
          commission
          typeId
          statusId
          providerReferenceId
          metadatas {
            languageId
            name
          }
        }
      }
      providerReferences {
        providerId
        providerReferenceId
      }
      categories {
        id
        name
        description
      }
    }
  }
`);
