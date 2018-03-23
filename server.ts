import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import {readFileSync} from 'fs';
import {render} from 'mustache';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html'))
  .toString()
  // we need to do this due to the fact that we don't have JS to use the 'template'
  .replace(/<template>|<\/template>/g, '');

app.get('*', (req, res) => {
  res.render('index', {
    req,
    res,
    document: render(
      template,
      {
        // these are from API
        containerID: 1235,
        brand: 'wildfire',
        platform: 'desktop'
      },
      {
        // possible partial from exterbnal file, this can be populated via readFile
        // optimizlyContainer: optimizlyEnabled ? optimizleCacheTemplate : noop(),
        partial: 'hello from {{brand}}'
      }
    )
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
