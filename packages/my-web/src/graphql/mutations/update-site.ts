import { gql } from '@apollo/client';

export const UPDATE_SITE = gql`
  mutation UpdateSite($input: UpdateSiteInput!) {
    updateSite(input: $input) {
      id
      name
      domain
      description
      logo {
        id
        url
      }
      metadatas {
        name
        description
        logo {
          id
          url
        }
        darkLogo {
          id
          url
        }
        languageId
      }
      createdAt
      updatedAt
    }
  }
`;
