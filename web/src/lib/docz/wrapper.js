import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from 'src/lib/graphql';

const Wrapper = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default Wrapper;
