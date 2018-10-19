import { ApolloServer, gql } from 'apollo-server-lambda';
import dbConfig from 'lambda/config/database';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

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
