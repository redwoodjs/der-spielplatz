import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CategoryList = () => (
  <Query
    query={gql`
      {
        categories {
          id
          name
          slug
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
      if (data) {
        const cats = data.categories.map(cat => <li key={cat.slug}>{cat.name}</li>);
        return <ul>{cats}</ul>;
      }
      return null;
    }}
  </Query>
);

export default CategoryList;
