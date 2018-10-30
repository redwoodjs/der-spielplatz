/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/App.js")
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, "../dist")]),
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },
  output: {
    pathinfo: true,
    filename: "[name].chunk.js",
    path: path.resolve(__dirname, "../dist")
  },
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: true,
        exclude: /node_modules/
      })
    ]
  }
};
