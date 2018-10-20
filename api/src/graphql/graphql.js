import { gql } from 'apollo-server-lambda';
import { Category, Post } from 'src/models';

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

  input PostInput {
    title: String!
    text: String!
  }

  type Query {
    category(id: ID!): Category
    posts: [Post!]!
  }

  type Mutation {
    postCreate(title: String!, text: String!): Post
  }
`;

// Provide resolver functions for your schema fields
export const resolvers = {
  Query: {
    category: (_, { id }) => Category.findById(id),
    posts: () => Post.findAll().then(posts => posts),
  },

  Mutation: {
    postCreate: (_, args) => Post.create(args).then(out => {
      console.log(out);
      out[0];
    }),
  },

  /* relations */
  Category: {
    posts: category => category.getPosts(),
  },
};
