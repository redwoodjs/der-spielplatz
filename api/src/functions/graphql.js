import fs from 'fs';
import path from 'path';
import {
  queryType, objectType, makeSchema, extendType,
} from 'nexus';
import { ApolloServer } from 'apollo-server-lambda';

const Query = queryType({
  definition(t) {
    t.string('hammer', () => 'time');
  },
});

const Ext = extendType({
  type: 'Query',
  definition: t => {
    t.string('version', () => 'v0.19.2');
  },
});

const schema = makeSchema({
  types: [Query, Ext],
  outputs: {
    schema: path.join(__dirname, '../../generated/schema.graphql'),
    typegen: path.join(__dirname, '../../generated/types.ts'),
  },
});

const server = new ApolloServer({
  schema,
});

export const handler = server.createHandler();
