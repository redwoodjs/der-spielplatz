import React from 'react';
import { Query as ApolloQuery } from 'react-apollo';

import Skeleton from './Skeleton';

export default ({ queryProps, skeleton, children }) => {
  return (
    <ApolloQuery errorPolicy="all" {...queryProps}>
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
