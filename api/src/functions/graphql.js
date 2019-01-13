import { merge } from 'lodash';
import { ApolloServer } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'apollo-server';
import { GraphQLDateTime } from 'graphql-iso-date';

import database from 'src/lib/database';

database.init();

const allTypeDefs = [
  `
  scalar Date

  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`,
];

const allResolvers = [
  {
    Date: GraphQLDateTime,
  },
];

const requires = require.context('../graphql', true, /\.js$/);
requires.keys().forEach(filename => {
  const { typeDefs, resolvers } = requires(filename);
  allTypeDefs.push(typeDefs);
  allResolvers.push(resolvers);
});

const schema = makeExecutableSchema({
  typeDefs: allTypeDefs,
  resolvers: merge(allResolvers),
});

const server = new ApolloServer({
  schema,
});

export const handler = server.createHandler();
