import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal/browser'; // for AoT we need to manually split universal packages

import { App, Home } from './app/app';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App, Home ],
  imports: [
    UniversalModule, // BrowserModule, HttpModule, and JsonpModule are included
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: Home, pathMatch: 'full' }
    ])
  ]
})
export class MainModule {

}
