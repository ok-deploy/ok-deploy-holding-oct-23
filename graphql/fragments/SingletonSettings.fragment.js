import { gql } from "apollo-boost";
import Image from "./Image.fragment";
import MuxVideo from "./MuxVideo.fragment";

export default gql`
  fragment SingletonSettings on SingletonSettings {
    navTicker
    description
    siteTagline
    notification {
      ... on Notification {
        heading
        subheading
        image {
          ...Image
        }
        body
        link
      }
    }
    homepageProjects {
      __typename
      ... on Project {
        title
        subheading
        comingSoon
        slug {
          current
        }
        tunnelMedia {
          __typename
          ...Image
          ...MuxVideo
        }
        coverMedia {
          __typename
          ...Image
          ...MuxVideo
        }
      }
    }
    reel {
      __typename
      ...MuxVideo
    }
    sharingImage {
      ...Image
    }
  }
  ${Image}
  ${MuxVideo}
`;
