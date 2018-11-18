import { merge } from 'lodash';
import { ApolloServer } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'apollo-server';

import database from 'src/lib/database';

import {
  typeDefs as postTypeDefs,
  resolvers as postResolvers,
} from 'src/graphql/post.js';

import {
  typeDefs as categoryTypeDefs,
  resolvers as categoryResolvers,
} from 'src/graphql/category.js';

database.init();

const baseTypeDefs = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const baseResolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, postTypeDefs, categoryTypeDefs],
  resolvers: merge(baseResolvers, postResolvers, categoryResolvers),
});

const server = new ApolloServer({
  schema,
});

export const handler = server.createHandler();
