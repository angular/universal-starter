var NODE_ENV  = process.env.NODE_ENV || 'development';
var HTML = {
  title: 'Universal starter',
  filename: 'index.ng2.html',
  template: 'index.ng2.html'
};

var pkg = require('./package.json');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
var CommonsChunkPlugin   = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var DedupePlugin   = webpack.optimize.DedupePlugin;
var DefinePlugin   = webpack.DefinePlugin;

/*
 * Config
 */
module.exports = {
  devtool: env({
    development: 'source-map',
    production: 'hidden-source-map'
  }),

  watch: env({
    development: true,
    production: false
  }),

  debug: true,

  cache: env({
    development: true,
    production: false
  }),

  displayErrorDetails: true,
  context: __dirname,

  entry: {
    app: [
      './src/bootstrap'
    ],
    vendors: [
      '@reactivex/rxjs',
      'zone.js',
      'reflect-metadata',
      'angular2/angular2',
      'angular2/core',
      'angular2/router',
      'angular2/http'
    ]
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: env({
      development: '[name].js',
      production: '[name].[hash].min.js'
    }),
    sourceMapFilename: env({
      development: '[name].js.map',
      production: '[name].[hash].min.js.map'
    }),
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    root: __dirname,
    extensions: ['','.ts','.js','.json'],
    alias: {
      'rx': '@reactivex/rxjs'
    }
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'raw' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.ts$/, loaders: ['ts'], exclude: /node_modules/ }
    ],
    noParse: [
      /rtts_assert\/src\/rtts_assert/,
      /reflect-metadata/
    ]
  },

  node: {
    crypto: false,
    __filename: true
  },

  plugins: env({
    production: [
      new UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_debugger: true
        },
        output: {
          comments: false
        },
        beautify: false
      })
    ],
    development: [
      //new webpack.HotModuleReplacementPlugin(),
    ]
  // All env plugins
  }).concat([
    new DefinePlugin({
      'VERSION': JSON.stringify(pkg.version)
    }),
    new OccurenceOrderPlugin(),
    new DedupePlugin(),

    new CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity,
      filename: env({
        development: '[name].js',
        production: '[name].[hash].min.js'
      })
    }),

    new CommonsChunkPlugin({
      name: 'common',
      filename: env({
        development: '[name].js',
        production: '[name].[hash].min.js'
      })
    }),

    new HtmlWebpackPlugin({
      title: HTML.title,
      filename: HTML.filename,
      template: HTML.template,
      minify: env({
        'development': false,
        'production': {
          removeComments: true,
          collapseWhitespace: true,
          preserveLineBreaks: true
        }
      })
    })
  ])
};

// Helper functions
function env(configEnv) {
  if (configEnv === undefined || configEnv[NODE_ENV] === undefined) {
    console.warn('No env data specified');
    return configEnv;
  }
  return configEnv[NODE_ENV];
}
