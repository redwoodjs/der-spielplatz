import { gql } from 'apollo-server-lambda';

let fakeCategories = [
  {
    id: 1,
    name: 'Books',
    slug: 'books',
    posts: [],
  },
  {
    id: 2,
    name: 'Magazines',
    slug: 'magazines',
    posts: [],
  },
];

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
    categories: () => fakeCategories,
    category: (_, { slug }) => fakeCategories.find(category => category.slug === slug),
  },

  Mutation: {
    categoryCreate: (_, args) => {
      fakeCategories = [...fakeCategories, args.category];
      return fakeCategories;
    },
  },

  Category: {
    posts: category => category.posts,
  },
};
