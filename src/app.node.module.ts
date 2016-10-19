import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { App, Home } from './app/app';
import { Cache } from './app/universal-cache';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App, Home ],
  imports: [
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: Home, pathMatch: 'full' }
    ])
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    Cache
  ]
})
export class MainModule {
  constructor(public cache: Cache) {

  }
  // we need to use the arrow function here to bind the context as this is a gotcha in Universal for now until it's fixed
  universalDoDehydrate = (universalCache) => {
    universalCache['Cache'] = JSON.stringify(this.cache.dehydrate());
  }
  universalAfterDehydrate = () => {
    this.cache.clear();
  }
}
