import React from 'react';
import PropTypes from 'prop-types';

import Query from 'src/lib/graphql/Query';
import Editor from 'src/components/Editor';
import { postFromSlug } from 'src/queries/post';

const EditPage = ({
  match: {
    params: { postSlug },
  },
}) => {
  return (
    <div>
      <Query component={Editor} spec={postFromSlug(postSlug)}>
        {data => <Editor {...data.post} />}
      </Query>
    </div>
  );
};

EditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      postSlug: PropTypes.string.isRequired,
    }),
  }),
};

export default EditPage;
