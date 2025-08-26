import { gql } from '@apollo/client';

export const GET_SITE_WITH_METADATA = gql`
  query GetSiteWithMetadata {
    site {
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
    languages(isSupported: true) {
      id
      name
      code
      shortName
      isSupported
      isDefault
    }
  }
`;
