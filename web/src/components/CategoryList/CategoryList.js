import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const renderPosts = posts => {
  const postList = posts.map(post => <li key={post.id}>{post.title}</li>);
  return <ul>{postList}</ul>;
};

const renderCategories = categories => {
  const cats = categories.map(cat => (
    <li key={cat.slug}>
      {cat.name}
      {renderPosts(cat.posts)}
    </li>
  ));
  return <ul>{cats}</ul>;
};

const CategoryList = () => (
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
      if (data) {
        return renderCategories(data.categories);
      }
      return null;
    }}
  </Query>
);

export default CategoryList;
