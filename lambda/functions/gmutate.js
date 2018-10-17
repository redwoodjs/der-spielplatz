import { ApolloServer, gql } from 'apollo-server-lambda';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Response {
    success: Boolean
    newTodo: String
  }

  type Query {
    ping: String
  }

  type Mutation {
    addTodo(user: ID, todo: String): Response
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ping: () => 'Pong',
  },
  Mutation: {
    addTodo: (root, args) => ({ success: true, newTodo: `${args.user}${args.todo}` }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
