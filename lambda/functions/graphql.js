import { ApolloServer, gql } from 'apollo-server-lambda';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'postgres://root:yzzCQ6e&3m>DDA@chainsaw.cwptmkqzxp8y.us-west-2.rds.amazonaws.com:5432/chainsaw'
);

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  text: {
    type: Sequelize.STRING,
  },
});

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => Post.findById(1).then(user => user.title),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
