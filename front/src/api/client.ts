import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://laboon-nts-v3.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "OwMG0CMuZsVJVYmUU6FpP2ux1fRBVLI6qyMGR5iW4dw6AqyFJCpOrCwLADzWFk94",
    "x-hasura-role": "admin"
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
