import { Model } from 'objection';

export default class Post extends Model {
  static tableName = 'posts';

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static relationMappings = {
    category: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/Category`,
      join: {
        from: 'posts.categoryId',
        to: 'categories.id',
      },
    },
  };
}
