const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const _ = require('lodash')

const TARGET = process.env.npm_lifecycle_event; // start, build

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  hash: true,
  filename: 'index.html',
  template: './src/index.html',
});
const cleanWebpackPlugin = new CleanWebpackPlugin();
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin(); 

const common = {
  // what is the main file (what do we need to compile)?
  entry: './src/index.js',
  plugins: [htmlWebpackPlugin, cleanWebpackPlugin],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ],
  },
};

const production = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main-[contentHash].js',
  },
};

const development = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8001,
    hot: true,
    writeToDisk: true,
  },
  plugins: [hotModuleReplacementPlugin],
  output: {
    // generate absolute path for compile target
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js',
  }
};

switch (TARGET) {
  case 'start':
    module.exports = _.mergeWith(development, common);
    break;
  case 'build':
    module.exports = _.mergeWith(production, common);
    break;
}

console.log(module.exports);