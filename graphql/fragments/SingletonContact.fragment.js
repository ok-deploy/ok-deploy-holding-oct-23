import { gql } from "apollo-boost";

export default gql`
  fragment SingletonContact on SingletonContact {
    contactAddress
    contactEmail
    contactPhone
    instagramProfile
    linkedIn
  }
`;
