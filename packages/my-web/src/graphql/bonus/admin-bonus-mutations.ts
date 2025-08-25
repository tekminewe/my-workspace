import { gql } from '@apollo/client';

export const CREATE_BONUS_TYPE = gql`
  mutation CreateBonusType($input: CreateBonusTypeInput!) {
    createBonusType(input: $input) {
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
    }
  }
`;

export const UPDATE_BONUS_TYPE = gql`
  mutation UpdateBonusType($id: String!, $input: UpdateBonusTypeInput!) {
    updateBonusType(id: $id, input: $input) {
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
    }
  }
`;

export const DELETE_BONUS_TYPE = gql`
  mutation DeleteBonusType($id: String!) {
    deleteBonusType(id: $id)
  }
`;
