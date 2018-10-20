import { Model } from 'objection';

export default class Category extends Model {
  static tableName = 'categories';

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static relationMappings = {
    posts: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/Post`,
      join: {
        from: 'categories.id',
        to: 'posts.categoryId',
      },
    },
  };
}
