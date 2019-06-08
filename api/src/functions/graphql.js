import fs from 'fs';
import path from 'path';

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

// const filesFromPath = (searchPath, exts = ["js", "ts"]) =>
//   fs
//     .readdirSync(searchPath)
//     .filter(filename => exts.includes(filename.split(".").pop()));

// const files = filesFromPath(path.join(__dirname, "../graphql"));

// console.log(files);

const schema = makeExecutableSchema({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
});

const server = new ApolloServer({
  schema,
});

export const handler = server.createHandler();
