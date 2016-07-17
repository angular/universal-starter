var fs = require('fs');
function EnvPlugin(config) {
  if (typeof config === 'string') {
    config = {env: config};
  }
  if (typeof config.env !== 'string') {
    throw new Error('must provide env')
  }
  var ALIAS = {
    '"dev"':         'dev',
    'development':   'dev',
    '"development"': 'dev',
    '"prod"':        'prod',
    'production':    'prod',
    '"production"':  'prod',
    '"test"':        'test',
    'testing':       'test',
    '"testing"':     'test',
  };
  var ENV = config.env.toLowerCase();
  console.log('EnvPlugin:', ENV + '\n');
  // TODO(gdi2290): allow more than one file
  this._file = config.file || 'environment';
  this._alias = config.alias || ALIAS;
  // TODO(gdi2290): check both type of files
  this._env =  this._alias[ENV] || ENV;
}
EnvPlugin.prototype.isEnvFile = function(file) {
  return file.indexOf(this._file + '.') !== -1;
}
EnvPlugin.prototype.replaceFile = function(file) {
  return file.replace(this._file, this._file + '.' + this._env);
}
EnvPlugin.prototype.updateResult = function(result) {
  var _this = this;
  ['request', 'userRequest', 'resource']
    .filter(function(key) { return result[key]; })
    .forEach(function (key) {
      result[key] = _this.replaceFile(result[key]);
    });
  return result;
}
EnvPlugin.prototype.apply = function(compiler) {
  var _this = this;
  compiler.plugin('normal-module-factory', function(normalModuleFactory) {
      normalModuleFactory.plugin('after-resolve', function(result, callback) {
        var _resource = result['resource'];
        if (!_this.isEnvFile(_resource)) {
          return callback(null, result);
        }
        var envFile = _this.replaceFile(_resource);

        fs.stat(envFile, function(err, stats) {
          if (err || !stats.isFile()) {
            var errorText = (!err && stats.isFile()) ? 'Is not a file.' : 'Does not exist.';
            console.log('\nWARNING:\n' + envFile + '\n' + errorText + ' ' + 'Using file\n' + _resource + '\n');
            return callback(null, result);
          }
          // mutate result
          var newResult = _this.updateResult(result);
          return callback(null, newResult);
        });

      });
  });
};

module.exports = EnvPlugin;
