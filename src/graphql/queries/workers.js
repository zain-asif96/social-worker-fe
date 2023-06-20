import { gql } from "apollo-boost";

export const GET_WORKERS = gql`
  query workers {
    workers(pagination: { limit: 500 }) {
      data {
        attributes {
          name
          latitude
          longitude
          email
          city
          areaOfSocialWork
          address
          state {
            data {
              attributes {
                name
              }
            }
          }
          profilePhoto {
            data {
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;
