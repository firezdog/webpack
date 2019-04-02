const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')

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
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/images/'),
    },
  },
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
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
          }
        }
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
  plugins: [hotModuleReplacementPlugin],
};

switch (TARGET) {
  case 'start':
    module.exports = merge(development, common);
    break;
  case 'build':
    module.exports = merge(production, common);
    break;
}