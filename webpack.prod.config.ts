var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');
var CompressionPlugin = optionalRequire('compression-webpack-plugin');
var V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');

import webpackConfig, { root, checkNodeImport, includeClientPackages } from './webpack.config';

export var commonPlugins = [
  new V8LazyParseWebpackPlugin(),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),

  new webpack.optimize.UglifyJsPlugin({
    // beautify: true,
    // mangle: false,
    output: {
      comments: false
    },
    compress: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false
    }
  }),

  // Loader options
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),

  // To use gzip, you can run 'npm install compression-webpack-plugin --save-dev'
  // add 'var CompressionPlugin = require("compression-webpack-plugin");' on the top
  // and comment out below codes
  //
  new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),

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
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
};

// Client.
export var clientPlugins = [

  new webpack.NormalModuleReplacementPlugin(
    /@angular(\\|\/)upgrade/,
    root('empty.js')
  ),
  // problem with platformUniversalDynamic on the server/client
  new webpack.NormalModuleReplacementPlugin(
    /@angular(\\|\/)compiler/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /@angular(\\|\/)platform-browser-dynamic/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /dom(\\|\/)debug(\\|\/)ng_probe/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /dom(\\|\/)debug(\\|\/)by/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /src(\\|\/)debug(\\|\/)debug_node/,
    root('empty.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /src(\\|\/)debug(\\|\/)debug_renderer/,
    root('empty.js')
  ),

  // Waiting for https://github.com/ampedandwired/html-webpack-plugin/issues/446
  // new webpack.optimize.AggressiveSplittingPlugin({
  //   minSize: 30000,
  //   maxSize: 250000
  // }),

];
export var clientConfig = {
  entry: './src/client.aot',
  recordsOutputPath: root('webpack.records.json')
};

// Server.
export var serverPlugins = [

];
export var serverConfig = {
  entry: './src/server.aot',
  output: {
    filename: 'index.js'
  },
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
