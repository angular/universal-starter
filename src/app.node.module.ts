import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { App, Home } from './app/app';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App, Home ],
  imports: [
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: Home, pathMatch: 'full' }
    ])
  ]
})
export class MainModule {

}
