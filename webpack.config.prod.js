// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';



const config = {
  entry: './app/bootstrap.js',
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist','scripts'),
    filename: '[name].[contenthash].js',
    /*publicPath: path.resolve(__dirname, 'dist','scripts')*/
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "app","index.html"), to: path.resolve(__dirname, "dist" ,"index.html"), },
        { from: path.resolve(__dirname, "app","src","styles.css"), to: path.resolve(__dirname, "dist","styles","styles.css"), }
      ],
    }),
    new CleanPlugin.CleanWebpackPlugin()
  ],
  module: {
    rules: [
      /*{
          test: /\.(js|jsx)$/i,
          loader: 'babel-loader',
      },
      {
          test: /\.css$/i,
          use: [stylesHandler,'css-loader'],
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
      },*/

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  /*devServer: {
    contentBase: './dist',
    compress: true,
    port: 9000,
  },*/
  devtool: "source-map"
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';


  } else {
    config.mode = 'development';
  }
  return config;
};
