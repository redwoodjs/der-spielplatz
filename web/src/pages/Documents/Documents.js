import React from 'react';
import { gql } from 'src/lib/graphql';
import { Link } from '@reach/router';

import { DocumentFragment, UserNoNestingFragment } from 'generated/api.fragments';

export default ({ documents }) => {
  return (
    <div>
      {documents.map(({ name, path, user: { username } }) => (
        <li key={path}>
          <code>
            <Link to={`?pathStartsWith=${path}`}>{name}</Link>
            <span>, by </span>
            {username}
          </code>
        </li>
      ))}
    </div>
  );
};

export const queryProps = args => ({
  query: gql`
    ${DocumentFragment}
    ${UserNoNestingFragment}
    query MVQ_DOCUMENTS {
      documents {
        ...Document
      }
    }
  `,
  ...args,
});

export const skeleton = () => {
  return {
    height: 300,
    width: 600,
    shapes: [
      <rect x="0" y="10" rx="0" ry="0" width="300" height="30" />,
      <rect x="0" y="65" rx="0" ry="0" width="150" height="15" />,
      <rect x="0" y="125" rx="0" ry="0" width="350" height="12" />,
      <rect x="0" y="150" rx="0" ry="0" width="350" height="12" />,
      <rect x="0" y="175" rx="0" ry="0" width="350" height="12" />,
      <rect x="0" y="200" rx="0" ry="0" width="350" height="12" />,
    ],
  };
};
