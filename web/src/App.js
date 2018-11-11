import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import client from 'src/lib/apolloGraphQLClient';
import Header from 'src/components/Header';

import HomePage from 'src/pages/HomePage';
import CategoryPage from 'src/pages/CategoryPage';

const Article = () => {
  return null;
};

// TODO: Add Article
const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/:categorySlug/" component={CategoryPage} />
        <Route path="/:categorySlug/:articleSlug" component={Article} />
      </>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('react-app'));
