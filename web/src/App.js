import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router } from '@reach/router';
import { parse } from 'qs';

import { client, Query } from 'src/lib/graphql';

import * as Documents from './pages/Documents';

import './global.css';

// MVQ: ModelViewQuery
const ViewWithQueryHandler = ({ module: { default: View, queryProps, skeleton }, ...rest }) => {
  const variables = parse(window.location.search, { ignoreQueryPrefix: true });
  return (
    <Query queryProps={queryProps({ variables })} skeleton={skeleton()}>
      {data => {
        return <View {...data} />;
      }}
    </Query>
  );
};

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <ViewWithQueryHandler path="/" module={Documents} />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('hammer-app'));
