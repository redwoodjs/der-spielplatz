import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import Database from 'src/lib/database';
import { typeDefs, resolvers } from 'src/graphql/graphql';

Database.init();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const HTTP_PORT = 8080;

const app = express();

server.applyMiddleware({
  app,
});

app.listen(
  { port: HTTP_PORT },
  /* eslint-disable-next-line no-console */
  () => console.log(
    `Listening on http://127.0.0.1:${HTTP_PORT}${server.graphqlPath}`
  )
);
