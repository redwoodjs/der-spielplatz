import { gql } from 'apollo-server-lambda';

import Post from 'src/models/Post';

export const typeDefs = gql`
  type Post {
    id: ID!
    slug: String!
    title: String!
    text: String!
    category: Category
  }

  input PostInput {
    title: String!
    slug: String!
    text: String!
    categoryId: ID!
  }

  extend type Query {
    post(slug: String!): Post
  }

  extend type Mutation {
    postCreate(post: PostInput!): Post
    postAddCategory(postId: ID!, categoryId: ID!): Post
  }
`;

export const resolvers = {
  Query: {
    post: (_, { slug }) => Post.query()
      .eager('category')
      .findOne({ slug }),
  },

  Mutation: {
    postCreate: (_, args) => {
      return Post.query().insert(args.post);
    },
    postAddCategory: (_, args) => {
      return Post.query().patchAndFetchById(args.postId, { categoryId: args.categoryId });
    },
  },
};
