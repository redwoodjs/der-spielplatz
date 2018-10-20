import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import database from 'src/lib/database';
import { typeDefs, resolvers } from 'src/graphql/graphql';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const HTTP_PORT = 8080;

database.sync();

const app = express();

server.applyMiddleware({
  app,
});

app.listen({ port: HTTP_PORT }, () => console.log(`Listening on http://127.0.0.1:${HTTP_PORT}${server.graphqlPath}`));
