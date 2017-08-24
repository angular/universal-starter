const { root } = require('./helpers');

const { AotPlugin } = require('@ngtools/webpack');
const nodeExternals = require('webpack-node-externals');

/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
  externals: [
    nodeExternals({
      whitelist: [/@angular/, /@ng/]
    })
  ],
  entry: root('./src/main.server.ts'),
  output: {
    filename: 'server.js'
  },
  target: 'node'
};
