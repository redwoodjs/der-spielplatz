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
  type Post {
    title: String!
    text: String!
  }

  type Query {
    posts: [Post!]!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    posts: () => Post.findAll().then(posts => posts),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
