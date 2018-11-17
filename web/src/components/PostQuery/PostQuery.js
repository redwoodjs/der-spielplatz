import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Post from 'src/components/Post';

const PostQuery = ({ postSlug }) => (
  <Query
    query={gql`
      query Post($slug: String!) {
        post(slug: $slug) {
          id
          title
          slug
          text
          category {
            id
            name
            slug
          }
        }
      }
    `}
    variables={{ slug: postSlug }}
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
      return <Post {...data.post} />;
    }}
  </Query>
);

PostQuery.propTypes = {
  postSlug: PropTypes.string.isRequired,
};

export default PostQuery;
