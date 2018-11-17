import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Link from 'src/components/Link';

const CategoryPage = ({
  match: {
    params: { categorySlug },
  },
}) => {
  return (
    <div>
      <Query
        query={gql`
          query ArticlesForCategory($slug: String!) {
            category(slug: $slug) {
              id
              name
              posts {
                id
                title
                slug
                text
              }
            }
          }
        `}
        variables={{ slug: categorySlug }}
      >
        {({ loading, error, data: { category } }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            return (
              <pre>
                <code>{error && error.graphQLErrors[0] && error.graphQLErrors[0].message}</code>
              </pre>
            );
          }

          return (
            <>
              <h2>
                Articles in
                {' '}
                <Link to={`/${categorySlug}`}>{category.name}</Link>
              </h2>
              <ol>
                {category.posts.map(({ slug, title }) => {
                  return (
                    <li key={slug}>
                      <Link to={`/${categorySlug}/${slug}`}>
                        <h3>{title}</h3>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </>
          );
        }}
      </Query>
    </div>
  );
};

CategoryPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categorySlug: PropTypes.string.isRequired,
    }),
  }),
};

export default CategoryPage;
