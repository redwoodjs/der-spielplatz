import React from 'react';
import PropTypes from 'prop-types';

import Query from 'src/lib/graphql/Query';
import Post from 'src/components/Post';
import { postFromSlug } from 'src/api/post';

const PostPage = ({ postSlug }) => {
  return (
    <div>
      <Query component={Post} spec={postFromSlug(postSlug)}>
        {data => <Post {...data.post} />}
      </Query>
    </div>
  );
};

PostPage.propTypes = {
  postSlug: PropTypes.string.isRequired,
};

export default PostPage;
