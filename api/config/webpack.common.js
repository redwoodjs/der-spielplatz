/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/graphql/graphql.js'),
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  output: {
    pathinfo: true,
    filename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist/static'),
  },
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/,
      }),
    ],
  },
};
