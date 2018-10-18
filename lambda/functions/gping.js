import { ApolloServer, gql } from 'apollo-server-lambda';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    ping: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ping: () => 'Pong',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
