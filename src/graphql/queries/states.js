import { gql } from "@apollo/client";

export const GET_STATES = gql`
  query statesQuery {
    states(pagination: { limit: 500 }) {
      data {
        id
        attributes {
          name
          workers {
            data {
              attributes {
                name
                profilePhoto {
                  data {
                    attributes {
                      name
                    }
                  }
                }
                city
              }
            }
          }
        }
      }
    }
  }
`;
