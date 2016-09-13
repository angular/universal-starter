// the polyfills must be the first thing imported in node.js
import 'angular2-universal-polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine } from 'angular2-express-engine';

// enable prod for faster renders
enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// Express View
import { main } from './main.node';
app.engine('.html', createEngine({ main }));
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(cookieParser('Angular 2 Universal'));
app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(express.static(path.join(ROOT, 'dist/client'), {index: false}));


import { serverApi } from './backend/api';
// Our API for demos only
app.get('/data.json', serverApi);

// Routes with html5pushstate
// ensure routes match client-side-app
app.get('/', (req, res) => res.render('index', {req, res}));
app.get('/about', (req, res) => res.render('index', {req, res}));
app.get('/about/*', (req, res) => res.render('index', {req, res}));
app.get('/home', (req, res) => res.render('index', {req, res}));
app.get('/home/*', (req, res) => res.render('index', {req, res}));


app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
