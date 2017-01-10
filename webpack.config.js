/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/app'
  ],
  devtool: 'eval-source-map',
  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot',
          'babel'],

        include: path.join(__dirname, 'src/js')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /jquery/,
        loader: 'expose?$!expose?jQuery'
      }
    ]
  }
};