import { ApolloServer, gql } from 'apollo-server-lambda';
import { GraphQLDateTime } from 'graphql-iso-date';

import database from 'src/lib/database';

import Category from 'src/models/Category';
import Post from 'src/models/Post';

database.init();

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  scalar Date

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

  type Post {
    id: ID!
    slug: String!
    title: String!
    text: String!
    createdAt: Date
    category: Category
  }

  input PostInput {
    title: String!
    slug: String!
    text: String!
    categoryId: ID!
  }

  type Query {
    post(slug: String!): Post
    categories: [Category]
    category(slug: String!): Category
  }

  type Mutation {
    postCreate(post: PostInput!): Post
    categoryCreate(category: CategoryInput!): Category
    postAddCategory(postId: ID!, categoryId: ID!): Post
  }
`;

// TODO: Checkout https://github.com/vincit/objection-graphql#onquery
export const resolvers = {
  Date: GraphQLDateTime,

  Query: {
    post: (_, { slug }) => Post.query()
      .eager('category')
      .findOne({ slug }),
    categories: () => Category.query().eager('posts'),
    category: (_, { slug }) => Category.query()
      .eager('posts')
      .findOne({ slug }),
  },

  Mutation: {
    postCreate: (_, args) => {
      return Post.query().insert(args.post);
    },
    categoryCreate: (_, args) => {
      return Category.query().insert(args.category);
    },
    postAddCategory: (_, args) => {
      return Post.query().patchAndFetchById(args.postId, { categoryId: args.categoryId });
    },
  },

  Category: {
    posts: category => category.posts,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = server.createHandler();
