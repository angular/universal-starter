import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as fs from 'fs';

import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Import the AOT compiled factory for your AppServerModule.
// This import will change with the hash of your built server bundle.
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist-server/main.bundle`);

const app = express();
const port = 8080;
const baseUrl = `http://localhost:${port}`;

// Set the engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');

app.set('views', './');
app.use('/', express.static('./', {index: false}));

app.get('*', (req, res) => {
  res.render('index', {
    req,
    res
  });
});

app.listen(port, () => {
	console.log(`Listening at ${baseUrl}`);
});
