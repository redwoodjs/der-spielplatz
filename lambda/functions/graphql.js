import { ApolloServer, gql } from 'apollo-server-lambda';
import { Post } from 'lambda/entities/Post';
import { createConnection } from 'lambda/lib/database';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const go = () => {
  const val = createConnection()
    .then(async connection => {
      console.log(connection);
      const post = await Post.findOne();
      return post.title;
    })
    .catch(error => {
      console.log(error);
      return error;
    });
  return val;
};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: go,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
