import * as express from 'express';
import {ng2engineWithPreboot} from 'angular2-universal-preview';

// Angular 2
import {App} from './src/app';

let app = express();

// Express View
app.engine('.ng2.html', ng2engineWithPreboot);
app.set('views', __dirname);
app.set('view engine', 'ng2.html');


// static files
app.use(express.static(__dirname));


app.use('/', (req, res) => {
  res.render('index', { App });
});



app.listen(3000, () => {
  console.log('Listen on http://localhost:3000');
});
