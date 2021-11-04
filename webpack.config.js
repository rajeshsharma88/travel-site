const currentTask = process.env.npm_lifecycle_event;
const path = require("path");

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-loader"),

  require("autoprefixer"),
];

let config = {
  entry: "./app/assets/scripts/App.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },
};

if (currentTask == "dev") {
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app"),
  };
  config.devServer = {
    watchFiles: "./app/**/*.html",

    static: path.join(__dirname, "app"),
    hot: true,
    port: 3000,
    host: "0.0.0.0",
  };
  config.mode = "development";
}

if (currentTask == "build") {
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "dist"),
  };
  config.mode = "production";
}

module.exports = config;
