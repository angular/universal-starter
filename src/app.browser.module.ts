import { About } from './app/about/about.component';
import { HomeModule } from './app/home/home.module';
import { AboutModule } from './app/about/about.module';
import { Home } from './app/home/home.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/browser'; // for AoT we need to manually split universal packages

import { App } from './app/app';
import { Cache } from './app/universal-cache';
const routes:Routes=[
      {path: '', component: Home},
      {path: 'about', component: About},
      {path: 'home', component: Home}
];

@NgModule({
  bootstrap: [ App ],
  declarations: [ App ],
  imports: [
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
    FormsModule,AboutModule,HomeModule,
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
