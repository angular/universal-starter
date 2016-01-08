var webpackMerge = require('webpack-merge');
var path = require('path');

var common = {
  resolve: {
    extensions: ['', '.ts', '.json', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2420, // 2420 -> Class incorrectly implements interface
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
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
  externals: function checkNodeImport(context, request, cb) {
    if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
      cb(null, 'commonjs ' + request); return;
    }
    cb();
  },
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
};

var defaults = {
  context: process.cwd(),
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
