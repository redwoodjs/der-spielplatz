import React from 'react';
import PropTypes from 'prop-types';

import { Query, gql } from 'src/lib/graphql';

import Post from 'src/components/Post';

const PostQuery = ({ postSlug }) => (
  <Query
    {...Post.queryProps}
    query={gql`
      query Post($slug: String!) {
        post(slug: $slug) {
          id
          title
          text
          createdAt
          category {
            name
            slug
          }
        }
      }
    `}
    variables={{ slug: postSlug }}
    errorPolicy="all"
  >
    {({ data: { post } }) => {
      return <Post {...post} />;
    }}
  </Query>
);

PostQuery.propTypes = {
  postSlug: PropTypes.string.isRequired,
};

export default PostQuery;
