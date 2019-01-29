import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Router } from '@reach/router';

import { client } from 'src/lib/graphql';
import Header from 'src/components/Header';

import HomePage from 'src/pages/HomePage';
import CategoryPage from 'src/pages/CategoryPage';
import PostPage from 'src/pages/PostPage';
import EditPage from 'src/pages/EditPage';

import './global.css';

const App = () => (
  <ApolloProvider client={client}>
    <Header />
    <Router>
      <HomePage path="/" default />
      <CategoryPage path="/:categorySlug" />
      <PostPage path="/:categorySlug/:postSlug" />
      <EditPage path="/edit/:postSlug" />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('hammer-app'));
