var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');

import webpackConfig, { root, checkNodeImport, includeClientPackages } from './webpack.config';

export var commonPlugins = [
  // new webpack.IgnorePlugin(/@angular(\\|\/)compiler/), // problem with platformUniversalDynamic
  new webpack.optimize.UglifyJsPlugin({
    // beautify: true,
    // mangle: false
  })

  // To use gzip, you can run 'npm install compression-webpack-plugin --save-dev'
  // add 'var CompressionPlugin = require("compression-webpack-plugin");' on the top
  // and comment out below codes
  //
  // new CompressionPlugin({
  //   asset: "[path].gz[query]",
  //   algorithm: "gzip",
  //   test: /\.js$|\.css$|\.html$/,
  //   threshold: 10240,
  //   minRatio: 0.8
  // })
];
export var commonConfig = {
};

// Client.
export var clientPlugins = [

];
export var clientConfig = {

};

// Server.
export var serverPlugins = [

];
export var serverConfig = {

};

export default [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, webpackConfig[0], {plugins: webpackConfig[0].plugins.concat(commonPlugins, clientPlugins) }),

  // Server
  webpackMerge(clone(commonConfig), serverConfig, webpackConfig[1], {plugins: webpackConfig[1].plugins.concat(commonPlugins, serverPlugins) })
];
