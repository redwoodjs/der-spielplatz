import requireDir from 'require-dir';
import { queryType, makeSchema } from 'nexus';
import { ApolloServer } from 'apollo-server-lambda';
import { resolve, join } from 'path';

const GRAPHQL_DIR = '../graphql/';
const OUTPUTS_DIR = '../../';

const BaseQueryType = queryType({
  definition(t) {
    t.string('hammer', () => 'time');
  },
});

const moreGraphQLTypes = requireDir(GRAPHQL_DIR, { recurse: false, extensions: ['.js'] });
const schema = makeSchema({
  types: [BaseQueryType, ...Object.values(moreGraphQLTypes)],
  outputs: {
    schema: resolve(join(OUTPUTS_DIR, 'schema.graphql')),
    typegen: resolve(join(OUTPUTS_DIR, 'generated-types.d.ts')),
  },
});

const server = new ApolloServer({
  schema,
});
export const handler = server.createHandler();
