import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from 'src/components/Link';

const PostPage = ({
  match: {
    params: { categorySlug, postSlug },
  },
}) => {
  return (
    <div>
      <Query
        query={gql`
          query Post($slug: String!) {
            post(slug: $slug) {
              title
              slug
              text
              category {
                name
                slug
              }
            }
          }
        `}
        variables={{ slug: postSlug }}
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

          const { title, text, category } = data.post;

          return (
            <>
              <h2>
                <Link to={`/${categorySlug}/${postSlug}`}>{title}</Link>
              </h2>
              <h3>
                in category
                {' '}
                <Link to={`/${categorySlug}/`}>{category.name}</Link>
              </h3>
              {text}
            </>
          );
        }}
      </Query>
    </div>
  );
};

PostPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categorySlug: PropTypes.string.isRequired,
    }),
  }),
};

export default PostPage;
