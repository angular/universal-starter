import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LazyComponent } from './lazy.component';
import { LazyRoutingModule } from './lazy-routing.module';

@NgModule({
  declarations: [
    LazyComponent
  ],
  imports: [
    SharedModule,
    LazyRoutingModule
  ]
})
export class LazyModule { }
