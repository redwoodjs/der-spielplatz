const merge = require('webpack-merge');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const webpackOverlay = {
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/,
      }),
    ],
  },
};

export default {
  title: 'Docz • Der Spielplatz',
  wrapper: 'src/lib/docz/wrapper.js',
  modifyBundlerConfig: config => {
    return merge(config, webpackOverlay);
  },
};
