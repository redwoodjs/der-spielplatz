import { ApolloServer, gql } from "apollo-server-lambda";
import Post from "src/models/Post";
import Category from "../models/Category";

import database from "src/lib/database";
database.init();

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
    slug: String!
    posts: [Post!]!
  }

  input CategoryInput {
    name: String!
    slug: String!
  }

  type Post {
    id: ID!
    title: String!
    text: String!
    category: Category
  }

  input PostInput {
    title: String!
    text: String!
  }

  type Query {
    category(id: ID!): Category
    posts: [Post!]!
  }

  type Mutation {
    postCreate(post: PostInput!): Post
    categoryCreate(category: CategoryInput!): Category
    postAddCategory(postId: ID!, categoryId: ID!): Post
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    category: (_, args) => {
      return Category.query()
        .eager("posts")
        .findById(args.id)
        .then(cat => cat);
    },
    posts: () => {
      return Post.query()
        .eager("category")
        .then(posts => posts);
    }
  },

  Mutation: {
    postCreate: (_, args) => {
      return Post.query()
        .insert(args.post)
        .then(post => post);
    },
    categoryCreate: (_, args) => {
      return Category.query()
        .insert(args.category)
        .then(cat => cat);
    },
    postAddCategory: (_, args) => {
      return Post.query()
        .patchAndFetchById(args.postId, { categoryId: args.categoryId })
        .then(post => post);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const handler = server.createHandler();
