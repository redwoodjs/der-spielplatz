import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery } from 'react-apollo';

import Skeleton from './Skeleton';

const Query = ({ skeleton, children, ...others }) => {
  return (
    <ApolloQuery {...others}>
      {({ loading, error, data }) => {
        if (loading) {
          if (typeof skeleton !== 'undefined') {
            return <Skeleton {...skeleton} />;
          }
          return <p>Loading...</p>;
        }

        if (error) {
          return (
            <pre>
              <code>{error && error.graphQLErrors[0] && error.graphQLErrors[0].message}</code>
            </pre>
          );
        }

        return children({ loading, error, data });
      }}
    </ApolloQuery>
  );
};

Query.propTypes = {
  skeleton: PropTypes.object,
  children: PropTypes.func.isRequired,
};

export default Query;
