import React from 'react';
import PropTypes from 'prop-types';

import Link from 'src/components/Link';

const renderPosts = posts => {
  const postList = posts.map(post => <li key={post.id}>{post.title}</li>);
  return <ul>{postList}</ul>;
};

const renderCategories = categories => {
  const cats = categories.map(cat => (
    <li key={cat.id}>
      <Link to={`/${cat.slug}`}>{cat.name}</Link>
      {renderPosts(cat.posts)}
    </li>
  ));
  return <ul>{cats}</ul>;
};

const CategoryList = props => renderCategories(props.categories);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ),
    }).isRequired
  ),
};

export default CategoryList;
