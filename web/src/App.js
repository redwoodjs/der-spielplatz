import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { client } from 'src/lib/graphql';
import Header from 'src/components/Header';

import HomePage from 'src/pages/HomePage';
import CategoryPage from 'src/pages/CategoryPage';
import PostPage from 'src/pages/PostPage';
import EditPage from 'src/pages/EditPage';

import './global.css';

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <>
        <Header />

        <Switch>
          <Route path="/edit/:postSlug" exact component={EditPage} />
          <Route path="/:categorySlug/:postSlug" exact component={PostPage} />
          <Route path="/:categorySlug" exact component={CategoryPage} />
          <Route path="/" exact component={HomePage} />
        </Switch>
      </>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('react-app'));
