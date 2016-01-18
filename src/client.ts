// import {bootstrap} from 'angular2/platform/browser';
import {bootstrap} from 'angular2-universal-preview';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {App} from './app/app';

bootstrap(App, [
  ...ROUTER_PROVIDERS
]);
