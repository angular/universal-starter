const webpack = require('webpack');
const path = require('path');
const clone = require('js.clone');
const webpackMerge = require('webpack-merge');
const V8LazyParseWebpackPlugin = require('v8-lazy-parse-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
import webpackConfig, { root,  includeClientPackages } from './webpack.config';
import { ROUTES } from './src/server.routes';
// const CompressionPlugin = require('compression-webpack-plugin');


export const commonPlugins = [
  new V8LazyParseWebpackPlugin(),

  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.AOT': true
    // 'process.env.PAGE': JSON.stringify('home') // see below
  }),

  // Loader options
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),

  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)async/,
    root('node_modules/@angular/core/src/facade/async.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)collection/,
    root('node_modules/@angular/core/src/facade/collection.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)errors/,
    root('node_modules/@angular/core/src/facade/errors.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)lang/,
    root('node_modules/@angular/core/src/facade/lang.js')
  ),
  new webpack.NormalModuleReplacementPlugin(
    /facade(\\|\/)math/,
    root('node_modules/@angular/core/src/facade/math.js')
  ),

];
export const commonConfig = {
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
};

// Client.
export const clientPlugins = [
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled', // change it to `server` to view bundle stats
    reportFilename: 'report.html',
    generateStatsFile: true,
    statsFilename: 'stats.json',
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

  new webpack.optimize.UglifyJsPlugin({
    // beautify: true,
    // mangle: false,
    output: {
      comments: false
    },
    compress: {
      // drop_debugger: false,

      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false // we need this for lazy v8
    },
    sourceMap: true
  }),

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
export const clientConfig = {
  entry: './src/client.aot'
};

// Server.

export const serverPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    // beautify: true,
    mangle: false, // to ensure process.env still works
    output: {
      comments: false
    },
    compress: {
      // drop_debugger: false,

      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false // we need this for lazy v8
    },
    sourceMap: true
  }),
  new webpack.DefinePlugin({
    'process.env.PAGE': '"home"'
  }),

  // https://github.com/mzgoddard/hard-source-webpack-plugin
  // update "clean:dist": "rimraf dist/client dist/server dist/_ts",
  // new HardSourceWebpackPlugin({
  //   // Either an absolute path or relative to output.path.
  //   cacheDirectory: './_tmp/cache/server',
  //   recordsPath: root('./dist/_records/webpack.server.records.json'),
  //   environmentHash: {
  //     root: process.cwd(),
  //     directories: ['node_modules'],
  //     files: ['package.json'],
  //   },
  // }),
];
export const serverConfig = {
  entry: './src/server.aot',
  output: {
    filename: 'index.js',
    chunkFilename: '[id].bundle.js',
    crossOriginLoading: false
  },
};


var webpackDev = webpackConfig();
var client = webpackMerge(webpackDev[0], clone(commonConfig), clientConfig, {plugins: [ ...commonPlugins, ...clientPlugins ] });

var clientPages = ROUTES.map((page) => {
  var bundle = page
  if (typeof page !== 'string') {
    bundle = page.page;
  }
  return webpackMerge(client, {
    output: {
      filename: bundle + '.[chunkhash].js',
      chunkFilename: '[id].' + bundle + '.[chunkhash].js'
    },
    // recordsOutputPath: root('_records/webpack.client-' + page + '.records.json'),
    plugins: [
      new HtmlWebpackPlugin({
        template: root('src/index.html'),
        filename: bundle + '.html'
      }),

      new ScriptExtHtmlWebpackPlugin({
        async: [new RegExp( bundle )]
      }),

      new webpack.DefinePlugin({
        'process.env.PAGE': JSON.stringify(bundle)
      }),

      // https://github.com/mzgoddard/hard-source-webpack-plugin
      // update "clean:dist": "rimraf dist/client dist/server dist/_ts",
      // new HardSourceWebpackPlugin({
      //   // Either an absolute path or relative to output.path.
      //   cacheDirectory: './_tmp/cache/'+ page,
      //   recordsPath: root('./dist/_records/webpack.client-' + page + '.records.json'),
      //   environmentHash: {
      //     root: process.cwd(),
      //     directories: ['node_modules'],
      //     files: ['package.json'],
      //   },
      // })
    ],
  });
});

export default [
  // Client
  ...clientPages,
  // webpackMerge(webpackConfig[0], clone(commonConfig), clientConfig, {plugins: webpackConfig[0].plugins.concat(commonPlugins, clientPlugins) }),

  // Server
  webpackMerge(webpackDev[1], clone(commonConfig), serverConfig, {plugins: [ ...commonPlugins, ...serverPlugins ] })
];
