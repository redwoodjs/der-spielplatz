import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery } from 'react-apollo';

import Skeleton from './Skeleton';

const Query = ({
  component, spec, children,
}) => {
  let skeleton;
  if (component.queryProps) {
    ({ skeleton } = component.queryProps);
  }
  return (
    <ApolloQuery {...spec}>
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

        return children(data);
      }}
    </ApolloQuery>
  );
};

Query.propTypes = {
  component: PropTypes.func,
  spec: PropTypes.object,
  children: PropTypes.func.isRequired,
};

export default Query;
