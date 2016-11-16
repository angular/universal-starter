var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');
var CompressionPlugin = optionalRequire('compression-webpack-plugin');

import webpackConfig, { root, checkNodeImport, includeClientPackages } from './webpack.config';

export var commonPlugins = [

  new webpack.optimize.UglifyJsPlugin({
    // beautify: true,
    // mangle: false
  }),

  // Loader options
  new webpack.LoaderOptionsPlugin({

  }),

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
  // }),

   new webpack.NormalModuleReplacementPlugin(
    /facade\/async/,
    root('node_modules/@angular/core/src/facade/async.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade\/collection/,
    root('node_modules/@angular/core/src/facade/collection.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade\/errors/,
    root('node_modules/@angular/core/src/facade/errors.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade\/lang/,
    root('node_modules/@angular/core/src/facade/lang.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade\/math/,
    root('node_modules/@angular/core/src/facade/math.js')
  ),
];
export var commonConfig = {
};

// Client.
export var clientPlugins = [
  // problem with platformUniversalDynamic on the server/client
  new webpack.IgnorePlugin(/@angular(\\|\/)compiler/),
  new webpack.IgnorePlugin(/dom(\\|\/)debug(\\|\/)ng_probe/),
  new webpack.IgnorePlugin(/dom(\\|\/)debug(\\|\/)by/),
];
export var clientConfig = {
  entry: './src/client.aot',

};

// Server.
export var serverPlugins = [

];
export var serverConfig = {
  entry: './src/server.aot',

};

export default [
  // Client
  webpackMerge(webpackConfig[0], clone(commonConfig), clientConfig, {plugins: webpackConfig[0].plugins.concat(commonPlugins, clientPlugins) }),

  // Server
  webpackMerge(webpackConfig[1], clone(commonConfig), serverConfig, {plugins: webpackConfig[1].plugins.concat(commonPlugins, serverPlugins) })
];


function optionalRequire(mod) {
  try {
    return require(mod);
  } catch (e) {
    return function () {};
  }
}
