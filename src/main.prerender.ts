import 'angular2-universal/polyfills';

// Angular 2 Universal
import {
  REQUEST_URL,
  ORIGIN_URL,
  NODE_LOCATION_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig,
  Bootloader
} from 'angular2-universal';

import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import './environment';
// Application
import {App} from './app/app.component';
import {routes} from './app/app.routes';


export {routes} from './app/app.routes';
export function getBootloader(config) {
  return new Bootloader({
    template: require('./index.html'),
    platformProviders: [
      {provide: ORIGIN_URL, useValue: config.origin},
      {provide: APP_BASE_HREF, useValue: config.baseUrl},
    ],
    beautify: true,
    async: true,
    preboot: false
  });
}

export function main(bootloader, config) {
  return bootloader.serializeApplication({
    providers: [
      {provide: REQUEST_URL, useValue: config.path},
      NODE_HTTP_PROVIDERS,
      provideRouter(routes),
      NODE_LOCATION_PROVIDERS
    ],
    directives: [
      App
    ],
  });
}
