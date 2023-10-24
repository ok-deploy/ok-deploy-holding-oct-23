import { gql } from "apollo-boost";

export default gql`
  fragment Image on Image {
    _key
    hotspot {
      x
      y
    }
    asset {
      url
      mimeType
      metadata {
        dimensions {
          width
          height
          aspectRatio
        }
      }
    }
  }
`;
