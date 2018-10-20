import Category from './Category';
import Post from './Post';
import Comment from './Comment';

// We pipe all our models into the associate function
const allModels = {
  Category,
  Post,
  Comment,
};

Object.keys(allModels).forEach(name => {
  const model = allModels[name];
  if (typeof model.associate === 'function') {
    model.associate(allModels);
  }
});

export { Category, Post, Comment };
