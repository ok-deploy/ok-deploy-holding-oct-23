import { gql } from "apollo-boost";

import SingletonContact from "./fragments/SingletonContact.fragment.js";
import SingletonHoldingPage from "./fragments/SingletonHoldingPage.fragment.js";

export default gql`
  query Homepage {
    SingletonContact(id: "singletonContact") {
      ...SingletonContact
    }
    SingletonHoldingPage(id: "singletonHoldingPage") {
      ...SingletonHoldingPage
    }
  }
  ${SingletonContact}
  ${SingletonHoldingPage}
`;
