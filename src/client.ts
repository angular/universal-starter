import 'es6-shim';
import 'angular2/bundles/angular2-polyfills';

import {bootstrap} from 'angular2/platform/browser';
import {prebootComplete} from 'angular2-universal-preview';
import {provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

enableProdMode();

import {App} from './app/app';

bootstrap(App, [
  ...ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
])
.then(prebootComplete)
