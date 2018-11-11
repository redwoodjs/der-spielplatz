import React from 'react';

import Header from 'src/components/Header';
import CategoryListQuery from 'src/components/CategoryListQuery';

const CategoryListPage = () => (
  <div>
    <Header />
    <div>
      <div>All Posts</div>
      <CategoryListQuery />
    </div>
  </div>
);

export default CategoryListPage;
