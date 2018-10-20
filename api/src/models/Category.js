import { Model } from 'objection';
import Post from 'src/models/Post';

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
      modelClass: Post,
      join: {
        from: 'categories.id',
        to: 'posts.categoryId',
      },
    },
  };
}
