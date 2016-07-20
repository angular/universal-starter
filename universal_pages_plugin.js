var evaluate = require('eval');
var path = require('path');
// var Promise = require('bluebird');
function isPresent(obj) {
  return obj !== undefined && obj !== null;
}

function ngRouteToArray(routes, defaultRoutes) {
  if (!routes) return defaultRoutes;
  // rely on mutate memo
  function traverseRoutes(prefix, _routes) {
    var newArray = []
    for (var i = 0; i < _routes.length; i++) {
      var route = _routes[i];
      var arg
      if (route.path === '') {
        newArray.push(prefix);
        continue;
      }
      var hasChildren = route.children && route.children.length;
      var newPrefix = prefix + route.path;

      if (hasChildren) {
        newArray = newArray.concat(traverseRoutes(newPrefix + '/', route.children));
      } else {
        newArray.push(newPrefix);
      }
    }
    return newArray;
  }
  var newRoutes = traverseRoutes('/', routes).filter(function(url) {
    return url.indexOf('*') === -1;
  });
  console.log('newRoutes', newRoutes);
  return newRoutes;
}

function UniversalPagesWebpackPlugin(config) {
  if (typeof config === 'string') {
    config = { chunk: config };
  }
  this.renderSrc = config.chunk || config.entry || config.src;
  this.outputPaths = config.outputPaths;
  this.publicPath = config.publicPath;
  this.locals = config.locals;
  this.scope = config.scope;
}

UniversalPagesWebpackPlugin.prototype.apply = function(compiler) {
  var self = this;


  compiler.plugin('emit', function(compiler, done) {
    var renderPromises;

    var webpackStats = compiler.getStats();
    var webpackStatsJson = webpackStats.toJson();

    try {
      var asset = findAsset(self.renderSrc, compiler, webpackStatsJson);

      if (asset === null) {
        throw new Error('Source file not found: "' + self.renderSrc + '"');
      }
      var assets = getAssetsFromCompiler(compiler, webpackStatsJson);

      var source = asset.source();
      var render = evaluate(
        source,
        /* filename: */
        self.renderSrc,
        /* scope: */
        self.scope,
        /* includeGlobals: */
        true
      );
      // var bootloaderCode = ''+
      // 'var Bootloader = require("angular2-universal").Bootloader' +
      // 'var bootloader = new Bootloader(config)' +
      // 'return function(appConfig) {' +
      // '  return bootloader.serializeApplication(appConfig);'
      // '}'
      // var bootloader = evaluate(bootloaderCode, 'bootloader.js', render.getPlatform(self.locals))

      if (!render.hasOwnProperty('getBootloader') || !render.hasOwnProperty('main')) {
        throw new Error('Export from "' + self.renderSrc + '" must be a function that return getBootloader() and main()');
      }

      var BOOTLOADER = render.getBootloader(self.locals);
      var urlPaths = ngRouteToArray(render.routes, self.outputPaths);

      renderPromises = urlPaths.map(function(outputPath) {
        var outputFileName = outputPath.replace(/^(\/|\\)/, ''); // Remove leading slashes for webpack-dev-server

        if (!/\.(html?)$/i.test(outputFileName)) {
            outputFileName = path.join(outputFileName, 'index.html');
        }

        var locals = {
          path: outputPath,
          assets: assets,
          webpackStats: webpackStats
        };

        for (var prop in self.locals) {
          if (self.locals.hasOwnProperty(prop)) {
            locals[prop] = self.locals[prop];
          }
        }

        return Promise
          // .resolve(bootloader(locals))
          .resolve(render.main(BOOTLOADER, locals))
          .then(function(output) {
            if (isPresent(self.publicPath)) {
              outputFileName = path.join(self.publicPath, outputFileName);
            }
            compiler.assets[outputFileName] = createAssetFromContents(output);
          })
          .catch(function(err) {
            compiler.errors.push(err.stack);
          });
      });

      Promise.all(renderPromises).then(function(modules) {
        done(null, modules)
      }, function(err) {
        compiler.errors.push(err.stack);
        done(err);
      });
    } catch (err) {
      compiler.errors.push(err.stack);
      done();
    }
  });
};

var findAsset = function(src, compiler, webpackStatsJson) {
  var asset = compiler.assets[src];
  if (asset) {
    return asset;
  }
  asset = compiler.modules
    .filter(function(mod) {
      return mod.resource === path.resolve(src)
    });
  if (asset && asset[0]) {
    return asset.source();
  }


  var chunkValue = webpackStatsJson.assetsByChunkName[src];

  if (!chunkValue) {
    return null;
  }
  // Webpack outputs an array for each chunk when using sourcemaps
  if (chunkValue instanceof Array) {
    // Is the main bundle always the first element?
    chunkValue = chunkValue[0];
  }
  return compiler.assets[chunkValue];
};

// Shamelessly stolen from html-webpack-plugin - Thanks @ampedandwired :)
var getAssetsFromCompiler = function(compiler, webpackStatsJson) {
  var assets = {};
  for (var chunk in webpackStatsJson.assetsByChunkName) {
    var chunkValue = webpackStatsJson.assetsByChunkName[chunk];

    // Webpack outputs an array for each chunk when using sourcemaps
    if (chunkValue instanceof Array) {
      // Is the main bundle always the first element?
      chunkValue = chunkValue[0];
    }

    if (compiler.options.output.publicPath) {
      chunkValue = compiler.options.output.publicPath + chunkValue;
    }
    assets[chunk] = chunkValue;
  }

  return assets;
};

var createAssetFromContents = function(contents) {
  return {
    source: function() {
      return contents;
    },
    size: function() {
      return contents.length;
    }
  };
};

module.exports = UniversalPagesWebpackPlugin;
