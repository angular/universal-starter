import 'angular2-universal/polyfills';

// Angular 2 Universal
import {
  REQUEST_URL,
  ORIGIN_URL,
  BASE_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig,
  Bootloader
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
// Application
import {App} from './app/app.component';
import {routes} from './app/app.routes';


export {routes} from './app/app.routes';
export function getBootloader(locals) {
  return new Bootloader({
    template: require('./index.html'),
    platformProviders: [
      {provide: ORIGIN_URL, useValue: locals.origin},
      {provide: APP_BASE_HREF, useValue: locals.baseUrl},
      {provide: BASE_URL, useValue: locals.baseUrl},
      {provide: REQUEST_URL, useValue: '/'},
      NODE_LOCATION_PROVIDERS
    ],
    beautify: true,
    async: true,
    preboot: false
  });
}

export function main(bootloader, locals) {
  return bootloader.serializeApplication({
    providers: [
      {provide: REQUEST_URL, useValue: locals.path},
      NODE_HTTP_PROVIDERS,
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS
    ],
    directives: [
      App
    ],
  });
}
