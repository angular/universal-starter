import 'angular2-universal-preview/polyfills';
import {prebootComplete} from 'angular2-universal-preview';

import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {enableProdMode} from 'angular2/core';

import {App} from './app/app.component';

enableProdMode();

bootstrap(App, [
  ...ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS
])
.then(prebootComplete);
