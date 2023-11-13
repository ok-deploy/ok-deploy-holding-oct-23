import { gql } from "apollo-boost";
import Image from "./Image.fragment";

export default gql`
  fragment SingletonHoldingPage on SingletonHoldingPage {
    heading
    body
    theme
    images {
      __typename
      ...Image
    }
    contactAddress
    contactEmail
    contactPhone
    instagramProfile
    linkedIn
    description
    sharingImage {
      ...Image
    }
  }
  ${Image}
`;
