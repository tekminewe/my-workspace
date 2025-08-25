import { gql } from '@apollo/client';

const BONUS_TYPE_METADATA_FRAGMENT = `
  metadatas {
    bonusTypeId
    languageId
    title
    description
    termsAndConditions
    featuredImageId
    logoId
    featuredImage {
      id
      url
      caption
      mimeType
    }
    logo {
      id
      url
      caption
      mimeType
    }
  }
`;

export const GET_BONUS_TYPES = gql`
  query GetBonusTypes {
    bonusTypes {
      id
      codeId
      version
      priority
      expiryDays
      maxUsagePerUser
      ruleConfig
      statusId
      effectiveFrom
      effectiveTo
      createdAt
      updatedAt
      createdBy
      updatedBy
      ${BONUS_TYPE_METADATA_FRAGMENT}
    }
  }
`;

export const GET_BONUS_TYPE = gql`
  query GetBonusType($id: String!) {
    bonusType(id: $id) {
      id
      codeId
      version
      priority
      expiryDays
      maxUsagePerUser
      ruleConfig
      statusId
      effectiveFrom
      effectiveTo
      createdAt
      updatedAt
      createdBy
      updatedBy
      ${BONUS_TYPE_METADATA_FRAGMENT}
    }
  }
`;
