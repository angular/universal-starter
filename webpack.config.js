var app = {
  target: 'web',
  entry: './src/bootstrap-worker',
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

var worker = {
  target: 'webworker',
  entry: './src/background',
  output: {
    path: __dirname + '/__build__',
    publicPath: '__build__/',
    filename: 'background.js'
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


module.exports = [
  app,
  worker
];
