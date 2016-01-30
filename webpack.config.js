var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  target: 'web',
  entry: './src/client',
  output: {
    path: __dirname + '/dist/client',
    publicPath: __dirname,
    filename: 'bundle.js'
  },

  resolve: {
    root: __dirname + '/src',
    extensions: ['', '.ts', '.json', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [ /node_modules/ ]
      }
    ],
    noParse: [
      path.resolve('node_modules', 'es6-shim', 'dist'),
      path.resolve('node_modules', 'angular2', 'bundles'),
      path.resolve('node_modules', 'zone.js', 'dist'),
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      comments: false
    })
  ]

}
