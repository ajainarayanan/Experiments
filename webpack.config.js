const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
let plugins = [
  new HtmlWebpackPlugin({
    title: "CDAP",
    template: "./index.html",
    filename: "index.html",
    hash: true
  }),
  new ExtractTextPlugin("styles.css"),
  new SpriteLoaderPlugin(),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new CleanWebpackPlugin(['dist'], {})
];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        __DEVTOOLS__: false
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}
module.exports = {
  entry: ["./index.js"],
  context: __dirname + "/src",
  plugins,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: [/node_modules/, /lib/],
        include: [path.join(__dirname, "src")]
      },
      {
        test: /\.svg/,
        use: [{ loader: "svg-sprite-loader", options: { symbolId: "[name]" } }]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name]-[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  }
};
