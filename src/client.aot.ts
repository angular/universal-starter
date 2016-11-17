// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.browser'; // temporary until 2.1.1 things are patched in Core

// Angular 2
import { enableProdMode} from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
// for AoT use platformBrowser
// import { platformUniversalDynamic } from 'angular2-universal/browser';

// enable prod for faster renders
enableProdMode();

import { MainModuleNgFactory } from './app/app.browser.module.ngfactory';

const platformRef = platformBrowser();

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => {

  platformRef.bootstrapModuleFactory(MainModuleNgFactory);

});
