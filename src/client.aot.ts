// the polyfills must be the first thing imported
import 'angular2-universal-polyfills';

// Angular 2
import { enableProdMode} from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal/browser';

// enable prod for faster renders
enableProdMode();

import { MainModuleNgFactory } from './app/app.browser.module.ngfactory';

const platformRef = platformUniversalDynamic();

// on document ready bootstrap Angular 2
document.addEventListener('DOMContentLoaded', () => {

  platformRef.bootstrapModuleFactory(MainModuleNgFactory);

});
