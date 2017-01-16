/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var myPlugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
  })
];


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
  //  'webpack-dev-server/client?http://localhost:3000/', // WebpackDevServer host and port
  //  'webpack/hot/only-dev-server',
   'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './src/js/app'
  ],
  resolveLoader: { root: path.join(__dirname, "node_modules")},
  output: {
    path: __dirname, 
    filename: 'app.js',
    publicPath: '/src/js'
  },
  plugins: myPlugins,
  module: {
    loaders: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loaders: ['react-hot','babel']
       // include: path.join(__dirname, 'src'),
       // publicPath: '/src/js'
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/, 
      //   loaders: ['react-hot','babel'],
      //  // include: path.join(__dirname, 'src/js')
      // },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      { test: /\.css$/, 
        loader: "style!css" 
      }
    ]
  }
};