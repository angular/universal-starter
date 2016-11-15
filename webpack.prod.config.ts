var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');

var commonPlugins = [
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
    root('./src'),
    {
      // your Angular Async Route paths relative to this root directory
    }
  ),
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

var commonConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  context: __dirname,
  output: {
    publicPath: '',
    filename: 'index.js',
    chunkFilename: '[id].bundle.js'
  },
  module: {
    loaders: [
      // TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ],
  },
  plugins: [
    // Use commonPlugins.
  ]

};

// Client.
var clientPlugins = [

];

var clientConfig = {
  target: 'web',
  entry: './src/client.aot',
  output: {
    path: root('dist/client')
  },
  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};


// Server.
var serverPlugins = [

];

var serverConfig = {
  target: 'node',
  entry: './src/server.aot', // use the entry file of the node server if everything is ts rather than es5
  output: {
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      { test: /@angular(\\|\/)material/, loader: "imports-loader?window=>global" }
    ],
  },
  // make sure every Angular2 package is bundled together to ensure that
  // the packages are pointing to the correct code
  externals: includeClientPackages(/@angular|angular2-|ng2-|ng-|angular-|@ngrx|@angular2|ionic|-angular2|-ng2|-ng/),
  node: {
    global: true,
    crypto: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false
  }
};

module.exports = [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, { plugins: clientPlugins.concat(commonPlugins) }),

  // Server
  webpackMerge(clone(commonConfig), serverConfig, { plugins: serverPlugins.concat(commonPlugins) })
];

function includeClientPackages(packages) {
  return function(context, request, cb) {
    if (packages) {
      if (packages instanceof RegExp && packages.test(request)) {
        return cb();
      } else if (typeof packages === 'string' && packages.indexOf(request) !== -1) {
        return cb();
      }
    }
    return checkNodeImport(context, request, cb);
  };
}
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
