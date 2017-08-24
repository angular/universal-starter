// Load zone.js for the server.
require('zone.js/dist/zone-node');
require('reflect-metadata')
const fs = require('fs');

// Import renderModuleFactory from @angular/platform-server.
const { renderModuleFactory } = require('@angular/platform-server');

// Import module map for lazy loading
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/dist-server/main.bundle`);

// Load the index.html file containing referances to your application bundle.
const index = fs.readFileSync('./dist/index.html', 'utf8');

// Writes rendered HTML to ./dist/index.html, replacing the file if it already exists.
renderModuleFactory(AppServerModuleNgFactory, {
  document: index,
  url: '/',
  extraProviders: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
})
.then(html => fs.writeFileSync('./dist/index.html', html));
