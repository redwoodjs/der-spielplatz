import React from 'react';

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

export default CategoryList;
