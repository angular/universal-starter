import 'zone.js/dist/zone';
import 'reflect-metadata';

import 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAppModule } from './app/browser-app.module';

export function main() {
  return platformBrowserDynamic().bootstrapModule(BrowserAppModule);
}

document.addEventListener('DOMContentLoaded', main, false);
