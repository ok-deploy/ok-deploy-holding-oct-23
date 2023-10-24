import { gql } from "apollo-boost";

import SingletonContact from "./fragments/SingletonContact.fragment.js";
import SingletonHoldingPage from "./fragments/SingletonHoldingPage.fragment.js";
import SingletonSettings from "./fragments/SingletonSettings.fragment.js";

export default gql`
  query Homepage {
    SingletonContact(id: "singletonContact") {
      ...SingletonContact
    }
    SingletonHoldingPage(id: "singletonHoldingPage") {
      ...SingletonHoldingPage
    }
    SingletonSettings(id: "singletonSettings") {
      ...SingletonSettings
    }
  }
  ${SingletonContact}
  ${SingletonHoldingPage}
  ${SingletonSettings}
`;
