const path = require("path");
const merge = require("webpack-merge");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const webSrcPath = path.resolve(__dirname, "../../web/src");

const webpackModifications = {
  resolve: {
    alias: {
      src: webSrcPath
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/
      })
    ]
  }
};

export default {
  src: webSrcPath,
  typescript: false,
  modifyBundlerConfig: config => {
    config.module.rules.push({
      test: /\.css$/,
      loader: "style-loader!css-loader"
    });
    return merge(config, webpackModifications);
  }
};
