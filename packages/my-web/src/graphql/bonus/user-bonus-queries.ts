import { gql } from '@apollo/client';

export const GET_MY_BONUSES = gql`
  query GetMyBonuses {
    myBonuses {
      id
      userId
      bonusTypeId
      bonusVersion
      statusId
      availableAt
      expiresAt
      usedAt
      eligibilityMetadata
      createdAt
      updatedAt
      bonusType {
        id
        codeId
        metadata {
          title
          description
          termsAndConditions
          logo {
            id
            url
          }
          featuredImage {
            id
            url
          }
        }
      }
    }
  }
`;

export const GET_MY_BONUS_TRANSACTIONS = gql`
  query GetMyBonusTransactions {
    myBonusTransactions {
      id
      userId
      bonusEligibilityId
      bonusTypeId
      bonusVersion
      amount
      currencyId
      sourceTransactionId
      merchantCallbackId
      processedAt
      walletTransactionId
      processingMetadata
      createdAt
      updatedAt
    }
  }
`;

export const GET_MY_BONUS_TRANSACTIONS_PAGINATED = gql`
  query GetMyBonusTransactionsPaginated($page: Int!, $pageSize: Int!) {
    myBonusTransactionsPaginated(page: $page, pageSize: $pageSize) {
      items {
        id
        userId
        bonusEligibilityId
        bonusTypeId
        bonusVersion
        amount
        currencyId
        sourceTransactionId
        merchantCallbackId
        processedAt
        walletTransactionId
        processingMetadata
        createdAt
        updatedAt
        bonusEligibility {
          bonusType {
            id
            codeId
            metadata {
              title
              description
            }
          }
        }
      }
      totalCount
      page
      pageSize
    }
  }
`;
