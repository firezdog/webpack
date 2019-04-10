const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge')

const TARGET = process.env.npm_lifecycle_event; // start, build

// common
const htmlWebpackPlugin = 
  new HtmlWebpackPlugin({
    hash: true,
    filename: 'index.html',
    template: './src/index.html',
  });
// prod
const miniCssExtractPlugin = 
  new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    })

const common = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/images/'),
    },
  },
  module: {
    rules: [
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
  optimization: {
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), miniCssExtractPlugin],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[contentHash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
};

const development = {
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

switch (TARGET) {
  case 'start':
    module.exports = merge(development, common);
    break;
  case 'build':
    module.exports = merge(production, common);
    break;
}