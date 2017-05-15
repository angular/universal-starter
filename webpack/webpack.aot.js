const { root } = require('./helpers');
const { AotPlugin } = require('@ngtools/webpack');

const tsconfigs = {
  client: root('./src/tsconfig.browser.json'),
  server: root('./src/tsconfig.server.json')
};

/**
 * Generates a AotPlugin for @ngtools/webpack
 *
 * @param {string} platform Should either be client or server
 * @param {boolean} aot Enables/Disables AoT Compilation
 * @returns {AotPlugin} Configuration of AotPlugin
 */
function getAotPlugin(platform, aot) {
  return new AotPlugin({
    tsConfigPath: tsconfigs[platform],
    skipCodeGeneration: !aot
  });
}

module.exports = {
  getAotPlugin: getAotPlugin
};
