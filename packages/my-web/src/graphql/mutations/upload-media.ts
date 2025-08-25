import { gql } from '@apollo/client';

export const UPLOAD_MEDIA = gql`
  mutation UploadMedia($data: UploadMediaInput!) {
    uploadMedia(data: $data) {
      id
      url
      mimeType
      caption
      createdAt
    }
  }
`;
