const { resolve } = require('path');

function root(path) {
  return resolve(__dirname, '..', path);
}

module.exports = {
  root: root
};
