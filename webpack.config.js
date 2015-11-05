
module.exports = {
  target: 'web',
  entry: './src/bootstrap',
  output: {
    path: __dirname + '/__build__',
    publicPath: '__build__/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  module: {
    loaders: [{
      test: /\.ts/, loaders: ['ts'], exclude: /node_modules/
    }]
  }
};
