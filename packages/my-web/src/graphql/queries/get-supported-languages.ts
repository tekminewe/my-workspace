import { gql } from '@apollo/client';

export const GET_SUPPORTED_LANGUAGES = gql`
  query GetSupportedLanguages {
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
