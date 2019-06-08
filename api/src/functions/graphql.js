import fs from 'fs';
import path from 'path';
import { merge } from 'lodash';

import { ApolloServer } from 'apollo-server-lambda';
import { makeExecutableSchema } from 'apollo-server';
import { GraphQLDateTime } from 'graphql-iso-date';

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

fs.readdirSync(path.join(__dirname, '../graphql/'))
  .filter(filename => ['js', 'ts'].includes(filename.split('.').pop()))
  .map(filename => `../graphql/${filename}`)
  .forEach(filepath => {
    const { typeDefs, resolvers } = require(filepath);
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
