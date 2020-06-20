/* eslint-disable */

// currentTask could be either dev or build
const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const postCSSPlugings = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer"),
];

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./app/assets/images", "./docs/assets/images");
    });
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [
    "css-loader?url=false",
    { loader: "postcss-loader", options: { plugins: postCSSPlugings } },
  ],
};

let pages = fse
  .readdirSync("./app")
  .filter(function (file) {
    return file.endsWith(".html");
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`,
    });
  });

let config = {
  //Script to watch
  entry: "./app/assets/scripts/App.js",
  //for webpack to insert the generated names of the scripts in the html
  plugins: pages,
  //always watching
  module: {
    rules: [cssConfig],
  },
};

if (currentTask == "dev") {
  cssConfig.use.unshift("style-loader");
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  };
  config.devServer = {
    before: function (app, server) {
      server._watch("./app/**/*.html");
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  };

  config.mode = "development";
}
if (currentTask == "build") {
  // for webpack to translate js to other versions
  // and work in a varity of web browsers
  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  });
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  postCSSPlugings.push(require("cssnano"));
  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "docs"),
  };
  config.mode = "production";

  //splitChunks splits the bundled.js into two separated files
  // one contains my code and the other the vendors code or third party code
  config.optimization = {
    splitChunks: { chunks: "all" },
  };
  //deletes the files that were changed in the dist folder
  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }),
    new RunAfterCompile()
  );
}

let deleteMeLater = {};

module.exports = config;
