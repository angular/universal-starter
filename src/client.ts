// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.browser'; // temporary until 2.1.1 things are patched in Core

// Angular 2
import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal/browser';
import { bootloader } from '@angularclass/bootloader';

import { load as loadWebFont } from 'webfontloader';
// Load fonts async
// https://github.com/typekit/webfontloader#configuration
function loadFont() {
  loadWebFont({
    google: {
      families: ['Droid Sans']
    }
  });
}

// enable prod for faster renders
// enableProdMode();

import { MainModule } from './browser.module';

export const platformRef = platformUniversalDynamic();

// on document ready bootstrap Angular 2
export function main() {
  (window.requestIdleCallback || setTimeout)(loadFont);

  return platformRef.bootstrapModule(MainModule);
}

// support async tag or hmr
bootloader(main);
