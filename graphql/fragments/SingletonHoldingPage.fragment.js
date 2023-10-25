import { gql } from "apollo-boost";
import Image from "./Image.fragment";

export default gql`
  fragment SingletonHoldingPage on SingletonHoldingPage {
    body
    images {
      __typename
      ...Image
    }
  }
  ${Image}
`;
