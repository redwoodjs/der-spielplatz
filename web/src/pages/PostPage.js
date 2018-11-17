import React from 'react';
import PropTypes from 'prop-types';

import PostQuery from 'src/components/PostQuery';

const PostPage = ({
  match: {
    params: { postSlug },
  },
}) => {
  return (
    <div>
      <PostQuery postSlug={postSlug} />
    </div>
  );
};

PostPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      categorySlug: PropTypes.string.isRequired,
      postSlug: PropTypes.string.isRequired,
    }),
  }),
};

export default PostPage;
