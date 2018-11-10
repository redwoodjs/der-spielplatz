import React from 'react';
import PropTypes from 'prop-types';

const renderPosts = posts => {
  const postList = posts.map(post => <li key={post.id}>{post.title}</li>);
  return <ul>{postList}</ul>;
};

const renderCategories = categories => {
  const cats = categories.map(cat => (
    <li key={cat.id}>
      {cat.name}
      {renderPosts(cat.posts)}
    </li>
  ));
  return <ul>{cats}</ul>;
};

const CategoryList = props => renderCategories(props.categories);

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
        })
      ),
    }).isRequired
  ),
};

export default CategoryList;
