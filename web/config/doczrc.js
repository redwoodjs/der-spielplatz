/* eslint-disable import/no-extraneous-dependencies */
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  modifyBundlerConfig: ({ resolve, ...others }) => {
    return {
      resolve: {
        plugins: [
          new DirectoryNamedWebpackPlugin({
            honorIndex: true,
            exclude: /node_modules/,
          }),
        ],
        ...resolve,
      },
      ...others,
    };
  },
};
