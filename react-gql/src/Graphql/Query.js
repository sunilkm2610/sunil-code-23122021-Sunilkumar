import { gql } from "@apollo/client";

export const CARS = gql`
  query {
    getAllCarsList {
      id
      model
      name
      image
      price
    }
  }
`;
