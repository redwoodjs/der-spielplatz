import Category from './Category';
import Post from './Post';

const allModels = {
  Category,
  Post,
};

Object.keys(allModels).forEach(key => {
  allModels[key].allModels = () => allModels;
});

export { Category, Post };
