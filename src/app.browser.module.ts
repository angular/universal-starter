import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/browser'; // for AoT we need to manually split universal packages

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home.component';
import { routes } from './app/app.routes';
import { Cache } from './app/universal-cache';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent, HomeComponent ],
  imports: [
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
    FormsModule,
    RouterModule.forRoot(routes)
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
}
