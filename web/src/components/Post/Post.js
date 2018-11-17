import React from 'react';
import PropTypes from 'prop-types';

import Link from 'src/components/Link';

const Post = ({
  title, slug, text, category,
}) => (
  <>
    <h2>
      <Link to={`/${category.slug}/${slug}`}>{title}</Link>
    </h2>
    <h3>
      in category
      {' '}
      <Link to={`/${category.slug}/`}>{category.name}</Link>
    </h3>
    {text}
  </>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }),
};

export default Post;
