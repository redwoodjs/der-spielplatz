import React from "react";

import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

export const client = ApolloClient({
  uri: "/.netlify/functions/graphql"
});

export const GraphQLProvider = props => (
  <ApolloProvider client={client} {...props} />
);
