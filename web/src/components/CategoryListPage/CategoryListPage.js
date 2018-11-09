import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import CategoryList from 'src/components/CategoryList';

const CategoryListQuery = () => (
  <Query
    query={gql`
      {
        categories {
          id
          name
          slug
          posts {
            id
            title
          }
        }
      }
    `}
    errorPolicy="all"
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        return (
          <pre>
            <code>{error && error.graphQLErrors[0] && error.graphQLErrors[0].message}</code>
          </pre>
        );
      }
      return <CategoryList categories={data.categories} />;
    }}
  </Query>
);

const CategoryListPage = () => (
  <div>
    <div>All Posts</div>
    <CategoryListQuery />
  </div>
);

export default CategoryListPage;
