const path = require("path");
const merge = require("webpack-merge");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const webSrcPath = path.resolve(__dirname, "../../web/src");

const webpackOverlay = {
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
  title: "Docz • Der Spielplatz",
  src: webSrcPath,
  typescript: false,
  //  wrapper: "src/lib/docz/wrapper.js",
  modifyBundlerConfig: config => {
    return merge(config, webpackOverlay);
  }
};
