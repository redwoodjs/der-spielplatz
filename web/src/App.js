import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import client from 'src/lib/apolloGraphQLClient';
import Header from 'src/components/Header';
import Main from 'src/components/Main';

const Admin = () => <div>I am the admin.</div>;

const App = () => (
  <ApolloProvider client={client}>
    <Header />
    <Router>
      <>
        <Route path="/" exact component={Main} />
        <Route path="/admin" component={Admin} />
      </>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('react-app'));
