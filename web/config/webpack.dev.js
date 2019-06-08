/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../dist'),
    port: 8911,
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8910',
        pathRewrite: {
          '^/\\.netlify/functions': '',
        },
      },
    },
  },
});
