import { gql } from "apollo-boost";

export default gql`
  fragment MuxVideo on MuxVideo {
    _key
    _type
    asset {
      playbackId
    }
  }
`;
