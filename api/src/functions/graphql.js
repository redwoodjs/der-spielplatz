import path from 'path';
import requireDir from 'require-dir';

import { queryType, makeSchema } from 'nexus';
import { ApolloServer } from 'apollo-server-lambda';

/**
 * Look for `*.js` files at this path. The modules should export a default function
 * the calls Nexus' `extendType`, e.g.:
 *
 * ```js
 * // Add "hello" field that resolves to "world" on the Query type.
 *  export default extendType({
 *    type: "Query",
 *    definition: t => { t.string("hello", () => "world") }
 *  })
 * ```
 */
const GRAPHQL_PATH = '../graphql';

const Query = queryType({
  definition(t) {
    t.string('hammer', () => 'time');
  },
});

const graphQLTypes = requireDir(GRAPHQL_PATH, {
  recurse: false,
  extensions: ['.js'],
});

const schema = makeSchema({
  types: [Query, ...Object.values(graphQLTypes).map(module => module.default)],
  outputs: {
    schema: path.join(__dirname, '../../my-schema.graphql'),
    typegen: path.join(__dirname, '../../my-generated-types.d.ts'),
  },
});

const server = new ApolloServer({
  schema,
});

export const handler = server.createHandler();
