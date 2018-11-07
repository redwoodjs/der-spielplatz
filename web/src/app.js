import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import client from 'src/lib/apolloGraphQLClient';
import Main from 'src/components/Main';

const App = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('react-app'));
