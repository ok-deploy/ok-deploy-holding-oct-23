import { gql } from "apollo-boost";

import SingletonHoldingPage from "./fragments/SingletonHoldingPage.fragment.js";

export default gql`
  query Homepage($id: ID!) {
    SingletonHoldingPage(id: $id) {
      ...SingletonHoldingPage
    }
  }
  ${SingletonHoldingPage}
`;
