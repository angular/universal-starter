// Set up ts-node to enable loading of TypeScript files.
require('ts-node/register');

// Trampoline into gulpfile.ts.
module.exports = require('./Gruntfile.ts');
