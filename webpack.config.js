/* eslint-disable */
const path = require("path");
const postCSSPlugings = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("autoprefixer"),
];
module.exports = {
  //Script to watch
  entry: "./app/assets/scripts/App.js",
  //The result script
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  },
  devServer: {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  },
  mode: "development",
  //always watching
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader?url=false",
          { loader: "postcss-loader", options: { plugins: postCSSPlugings } },
        ],
      },
    ],
  },
};
