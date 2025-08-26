import { gql } from "@apollo/client";

export const ADMIN_ADVERTISER_CAMPAIGN_DETAIL_PAGE_QUERY = gql`
  query AdminAdvertiserCampaignDetailPageQuery(
    $id: String!
    $isSupported: Boolean
  ) {
    advertiserCampaign(id: $id) {
      id
      slug
      statusId
      advertiserId
      providerId
      providerReferenceId
      startDate
      endDate
      url
      metadatas {
        languageId
        name
        description
        banner {
          id
          url
        }
      }
    }
    languages(isSupported: $isSupported) {
      id
      name
      code
    }
  }
`;
