/* eslint-disable */
const path = require("path");
const postCSSPlugings = [
  require("postcss-import"),
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
  mode: "development",
  //always watching
  watch: true,
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
