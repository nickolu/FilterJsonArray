const path = require("path");
const webpack = require("webpack");

module.exports = () => {
  return {
    resolve: {
      extensions: ['.js'],
      alias: {
        Root: path.resolve(__dirname),
        '@':  path.resolve(__dirname, 'src/'),
      },
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: "/dist/",
      filename: "[name].js"
    },
    entry: './src/jsonFilterApi.js',
    mode: 'production',
    module: {
      rules: [

        {
          test: /\.(jsx|js)$/,
          include: [
            path.resolve(__dirname, "src")
          ],
          loader: "babel-loader"
        },
      ]
    }
  };

};
