import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    upload(file: $file) {
      data {
        id
        attributes {
          name
          url
          previewUrl
          width
          height
          ext
          mime
        }
      }
    }
  }
`;
