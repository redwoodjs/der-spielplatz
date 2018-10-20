import Sequelize from 'sequelize';

import database from 'src/lib/database';

export const schema = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  slug: {
    type: Sequelize.STRING,
    unique: true,
  },
};

const Category = database.define('category', schema);
Category.associate = models => {
  Category.hasMany(models.Category);
};

export default Category;
