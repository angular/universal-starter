// the polyfills must be the first thing imported in node.js
import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

// Angular 2 Universal
import {enableProdMode, expressEngine} from 'angular2-universal';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

// enable prod for faster renders
enableProdMode();

// Express View
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(bodyParser.json());

// Serve static files
app.use(express.static(ROOT, {index: false}));

// Our API for demos only
import {serverApi} from './backend/api';
app.get('/data.json', serverApi);

// Routes with html5pushstate
import {ngApp} from './main.node';
app.use('/', ngApp);
app.use('/about', ngApp);
app.use('/home', ngApp);

// use indexFile over ngApp only when there is too much load on the server
function indexFile(req, res) {
  // when there is too much load on the server just send
  // the index.html without prerendering for client-only
  res.sendFile('/index.html', {root: __dirname});
}

// Server
app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
