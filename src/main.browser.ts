// Angular 2 Universal
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

// Application
import {App} from './app/app.component';

// you must return bootstrap for client.ts
export function ngApp() {
  return bootstrap(App, [
    ...ROUTER_PROVIDERS,
    ...HTTP_PROVIDERS
  ]);
}
