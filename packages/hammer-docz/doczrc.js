const path = require("path");
const merge = require("webpack-merge");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const webSrcPath = path.join(__dirname, "../../web/src");

console.log(webSrcPath);

const webpackModifications = {
  resolve: {
    alias: {
      src: webSrcPath
    },
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/
        //include: [webSrcPath]
      })
    ]
  }
};

export default {
  src: webSrcPath,
  typescript: false,
  wrapper: "src/lib/docz/wrapper",
  modifyBundlerConfig: config => {
    return merge(config, webpackModifications);
  }
};
