import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';

import { App } from './app/app';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App ],
  imports: [
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    FormsModule
  ]
})
export class MainModule {

}
