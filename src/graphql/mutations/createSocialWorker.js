import { gql } from "@apollo/client";

export const CREATE_SOCIAL_WORKER = gql`
  mutation createSocialWorker(
    $name: String
    $zipCode: Int
    $state: ID
    $email: String
    $areaOfSocialWork: String
    $city: String
    $profilePhoto: ID
    $latitude: Float
    $longitude: Float
    $address: String
  ) {
    createWorker(
      data: {
        name: $name
        zipCode: $zipCode
        state: $state
        email: $email
        areaOfSocialWork: $areaOfSocialWork
        city: $city
        profilePhoto: $profilePhoto
        latitude: $latitude
        longitude: $longitude
        address: $address
      }
    ) {
      data {
        id
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
