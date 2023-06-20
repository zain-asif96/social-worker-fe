import { gql } from "@apollo/client";

export const GET_HEADER_TEXT = gql`
  query headerTextQuery {
    headerText {
      data {
        attributes {
          Title
        }
      }
    }
  }
`;
