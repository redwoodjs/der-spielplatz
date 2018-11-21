import BaseModel from 'src/lib/BaseModel';

export const schema = {
  type: 'object',
  required: ['name', 'slug'],

  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    slug: { type: 'string' },
  },
};

export default class Category extends BaseModel {
  static tableName = 'categories';

  static get relationMappings() {
    return { posts: { relation: BaseModel.HasManyRelation, modelClass: this.allModels().Post, join: { from: 'categories.id', to: 'posts.categoryId' } } };
  }

  static get jsonSchema() {
    return schema;
  }
}
