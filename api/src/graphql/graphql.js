import { gql } from 'apollo-server-lambda';
import { Category, Post, Comment } from 'src/models';

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
    slug: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    text: String!
    category: Category!
  }

  type Query {
    category(id: ID!): Category
    posts: [Post!]!
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    category: (_, { id }) => Category.findById(id),
    posts: () => Post.findAll().then(posts => posts),
  },

  /* relations */
  Category: {
    posts: category => category.getPosts(),
  },
};
