import { gql } from 'apollo-server-lambda';

import Category from 'src/models/Category';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
    slug: String!
    posts: [Post]
  }

  input CategoryInput {
    name: String!
    slug: String!
  }

  extend type Query {
    categories: [Category]
    category(slug: String!): Category
  }

  extend type Mutation {
    categoryCreate(category: CategoryInput!): Category
  }
`;

export const resolvers = {
  Query: {
    categories: () => Category.query().eager('posts'),
    category: (_, { slug }) => Category.query()
      .eager('posts')
      .findOne({ slug }),
  },

  Mutation: {
    categoryCreate: (_, args) => {
      return Category.query().insert(args.category);
    },
  },

  Category: {
    posts: category => category.posts,
  },
};
