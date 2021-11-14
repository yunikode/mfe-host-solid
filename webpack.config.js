const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = (options) => {
  return {
    output: {
      publicPath: options.WEBPACK_BUILD
        ? "https://zee-german.github.io/mfe-host-solid/"
        : "http://localhost:8080/",
    },

    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },

    devServer: {
      port: 8080,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "host",
        filename: "remoteEntry.js",
        remotes: {
          remote: options.WEBPACK_BUILD
            ? "remote@https://zee-german.github.io/mfe-remote-solid/remoteEntry.js"
            : "remote@http://localhost:3000/remoteEntry.js",
        },
        exposes: {},
        shared: {
          ...deps,
          "solid-js": {
            singleton: true,
            requiredVersion: deps["solid-js"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
};
