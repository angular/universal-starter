var webpack = require('webpack');

import path = require('path');
import {WebpackAngular2Prerender} from 'angular2-webpack-prerender';
import {REQUEST_URL, SERVER_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {provide, enableProdMode} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';
import {App} from './src/app/app';
enableProdMode();


export default {
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
    }),
    new WebpackAngular2Prerender({
      App,
      providers: [
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(REQUEST_URL, {useValue: '/'}),
        ROUTER_PROVIDERS,
        SERVER_LOCATION_PROVIDERS,
      ],
      preboot: true
    })
  ]

}
