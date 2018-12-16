import React from 'react';

import Query from 'src/lib/graphql/Query';
import CategoryList from 'src/components/CategoryList';
import { allCategories } from 'src/api/category';

const HomePage = () => {
  return (
    <div>
      <Query component={CategoryList} spec={allCategories()}>
        {data => <CategoryList {...data} />}
      </Query>
    </div>
  );
};

export default HomePage;
