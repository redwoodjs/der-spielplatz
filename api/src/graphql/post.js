import { gql } from 'apollo-server-lambda';

let fakePosts = [
  {
    id: 1,
    slug: 'a-book-review',
    createdAt: new Date(),
    title: 'A book review',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: {},
  },
  {
    id: 2,
    slug: 'the ocho',
    createdAt: new Date(),
    title: 'obscure sports weekly',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: {},
  },
];

export const typeDefs = gql`
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
  input PostUpdateInput {
    id: ID!
    title: String!
    text: String!
  }
  extend type Query {
    post(slug: String!): Post
  }
  extend type Mutation {
    postCreate(post: PostInput!): Post
    postUpdate(post: PostUpdateInput!): Post
    postAddCategory(postId: ID!, categoryId: ID!): Post
  }
`;

export const resolvers = {
  Query: {
    post: (_, { slug }) => fakePosts.find(post => post.slug === slug),
  },

  Mutation: {
    postCreate: (_, args) => {
      fakePosts = [...fakePosts, args.post];
      return fakePosts;
    },
    postUpdate: (_, args) => {
      // const {
      //   post: { id, title, text },
      // } = args;
      // return Post.query().patchAndFetchById(id, { title, text });
    },
    postAddCategory: (_, args) => {
      // return Post.query().patchAndFetchById(args.postId, { categoryId: args.categoryId });
    },
  },
};
