var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

process.env.ENV = process.env.ENV || 'dev';

var commonConfig = {
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      // TypeScript
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.html/, loaders: ['html'] },
      { test: /\.scss$/, loaders: ['to-string', 'css', 'postcss', 'sass'] }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.ENV)
    }),
  ],
  devtool: process.env.ENV == 'dev'? 'source-map' : null
};

var clientConfig = {
  target: 'web',
  entry: './src/client',
  output: {
    path: path.join(__dirname, 'dist', 'client')
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
  entry: './src/server',
  output: {
    path: path.join(__dirname, 'dist', 'server')
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



// Default config
var defaultConfig = {
  module: {
    noParse: [
      path.join(__dirname, 'zone.js', 'dist'),
      path.join(__dirname, 'angular2', 'bundles')
    ]
  },
  context: __dirname,
  resolve: {
    root: path.join(__dirname, '/src')
  },
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'bundle.js'
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
