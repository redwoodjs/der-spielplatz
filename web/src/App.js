import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import client from 'src/lib/apolloGraphQLClient';
import Main from 'src/components/Main';

const Admin = () => <h2>I'm the admin son.</h2>;

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <a href="/">Categories</a>
      {' | '}
      <a href="/admin">Admin</a>
      {' | '}
    </div>
    <Router>
      <>
        <Route path="/" exact component={Main} />
        <Route path="/admin" component={Admin} />
      </>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('react-app'));
