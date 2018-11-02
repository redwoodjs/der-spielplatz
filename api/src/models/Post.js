import { Model } from 'objection';

export const schema = {
  type: 'object',
  required: ['title', 'text', 'categoryId'],

  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    text: { type: 'string' },
    age: { type: 'number' },
    category: { type: 'object' },
  },
};

export default class Post extends Model {
  static tableName = 'posts';

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: this.allModels().Category,
        join: {
          from: 'posts.categoryId',
          to: 'categories.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return schema;
  }
}
