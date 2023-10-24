import ApolloClient from "apollo-boost";
import fetch from "isomorphic-unfetch";

export const client = new ApolloClient({
  fetch,
  uri: process.env.NEXT_PUBLIC_SANITY_API_ENDPOINT,
});

export const performQuery = async (query, variables = {}, queryParams = {}) => {
  const result = await client.query({
    query,
    variables,
    fetchPolicy: "no-cache", // we don't need to cache as we're using Static rendering
  });
  return result;
};
