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
      { test: /\.ts$/, loaders: ['ts-loader'] },
      {
        test: /\.html/,
        loader: 'html',
        query: {
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          // Teach html-minifier about Angular 2 syntax
          customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
          ],
          customAttrAssign: [/\)?\]?=/]
        }
      },
      { test: /\.scss$/, loaders: ['to-string', 'css', 'postcss', 'resolve-url', 'sass?sourceMap'] }
    ]
  },
  'uglify-loader': {
    mangle: false
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(process.env.ENV)
    })
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
  },
  plugins: []
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
};

if(process.env.ENV == 'prod'){
  commonConfig.plugins = commonConfig.plugins || [];
  commonConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        compress: {
          caseSensitive: true,
          warnings: true,
          drop_console: true,
          unsafe: false
        }
      }
    })
  );
}

var webpackMerge = require('webpack-merge');
module.exports = [
  // Client
  webpackMerge({}, defaultConfig, commonConfig, clientConfig),

  // Server
  webpackMerge({}, defaultConfig, commonConfig, serverConfig)
];

// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}
