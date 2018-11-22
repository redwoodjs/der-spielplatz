import BaseModel from 'src/lib/BaseModel';

export const schema = {
  type: 'object',
  required: ['title', 'slug', 'text', 'categoryId'],

  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    text: { type: 'string' },
    category: { type: 'object' },
  },
};

export default class Post extends BaseModel {
  static tableName = 'posts';

  static get relationMappings() {
    return {
      category: {
        relation: BaseModel.BelongsToOneRelation,
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
