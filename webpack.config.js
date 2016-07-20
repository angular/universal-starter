// require('angular2-universal-polyfills');
// require('ts-helpers');

var webpack = require('webpack');
var path = require('path');
var EnvPlugin = require('./env_plugin');
var UniversalPagesPlugin = require('./universal_pages_plugin');
var UniversalPrerenderPlugin = require('./universal_prerender_plugin');



var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js', '.json']
  },
  module: {
    loaders: [
      // TypeScript
      { test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.json$/, loader: 'raw-loader' }
    ],
    preLoaders: [
      // needed to lower the filesize of angular due to inline source-maps
      { test: /\.js$/, loader: 'source-map-loader' }
    ],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new EnvPlugin('production'),
  ]

};


var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: root('dist/public')
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


var serverConfig = {
  target: 'node',
  // entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  entry: {
    'server/prerender': './src/main.prerender',
    'server/index': './src/server'
  },
  output: {
    path: root('dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: checkNodeImport,
  plugins: [
    // new UniversalPrerenderPlugin({
    //   chunk: 'server/prerender',
    //   publicPath: 'public',
    //   locals: {
    //     origin: 'http://localhost:3000',
    //     baseUrl: '/'
    //   }
    // })
    new UniversalPagesPlugin({
      chunk: 'server/prerender',
      publicPath: 'public',
      locals: {
        origin: 'http://localhost:3000',
        baseUrl: '/'
      }
    })
  ],
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};



// Default config
var defaultConfig = {
  context: __dirname,
  resolve: {
    root: root('/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
  }
}



var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
]

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
