import * as express from 'express';
import * as path from 'path';
import {ng2engine} from 'angular2-universal-preview';

// Angular 2
import {App} from './src/app';

const app = express();
const browserify = require('browserify-middleware');

// Express View
app.engine('.ng2.html', ng2engine);
app.set('views', __dirname);
app.set('view engine', 'ng2.html');

app.get('/bundle.js', browserify(__dirname + '/src/bootstrap.ts', {
  plugins: [{ plugin: 'tsify' }],
  run: true
}));

// static files
app.use(express.static(__dirname));

app.use('/', (req, res) => {
  res.render('index', { App });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Listen on http://localhost:3000');
});
