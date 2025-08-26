import { gql } from '@apollo/client';

export const GET_SITE_ADMIN = gql`
  query GetSiteAdmin {
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
