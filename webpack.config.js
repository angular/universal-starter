var webpackMerge = require('webpack-merge');
var path = require('path');

var common = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [ /node_modules/ ]
      }
    ]
  }
};

var client = {
  target: 'web',
  entry: './src/client',
  output: {
    path: __dirname + '/dist/client'
  }
};

var server = {
  target: 'node',
  entry: './src/server',
  output: {
    path: __dirname + '/dist/server'
  },
  externals: checkNodeImport,
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

var defaults = {
  context: __dirname,
  resolve: {
    root: __dirname + '/src'
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
  }
}

module.exports = [
  // Client
  webpackMerge({}, defaults, common, client),

  // Server
  webpackMerge({}, defaults, common, server)
]

// Helpers
function checkNodeImport(context, request, cb) {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      cb(null, 'commonjs ' + request); return;
    }
    cb();
  }
