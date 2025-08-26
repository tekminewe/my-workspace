import { gql } from '@apollo/client';

export const GENERATE_IMAGE = gql`
  mutation GenerateImage($input: ImageGenerationInput!) {
    generateImage(input: $input) {
      success
      imageUrl
      imageBase64
      prompt
      provider
      referenceImages
      metadata {
        model
        size
        seed
        timings
        hasNsfwConcepts
      }
      error
    }
  }
`;
