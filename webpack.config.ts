var webpack = require('webpack');
var path = require('path');
var clone = require('js.clone');
var webpackMerge = require('webpack-merge');

export var commonPlugins = [
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
    root('./src'),
    {
      // your Angular Async Route paths relative to this root directory
    }
  ),

  // Loader options
  new webpack.LoaderOptionsPlugin({

  }),

];

export var commonConfig = {
  // https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-maps',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  context: __dirname,
  output: {
    publicPath: path.resolve(__dirname),
    filename: 'index.js'
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
export var clientPlugins = [

];

export var clientConfig = {
  target: 'web',
  entry: './src/client',
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
export var serverPlugins = [

];

export var serverConfig = {
  target: 'node',
  entry: './src/server', // use the entry file of the node server if everything is ts rather than es5
  output: {
    path: root('dist/server'),
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      { test: /@angular(\\|\/)material/, loader: "imports-loader?window=>global" }
    ],
  },
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

export default [
  // Client
  webpackMerge(clone(commonConfig), clientConfig, { plugins: clientPlugins.concat(commonPlugins) }),

  // Server
  webpackMerge(clone(commonConfig), serverConfig, { plugins: serverPlugins.concat(commonPlugins) })
];




// Helpers

export function includeClientPackages(packages) {
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

export function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}

export function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
