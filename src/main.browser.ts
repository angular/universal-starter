import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UniversalModule } from 'angular2-universal';

import { App } from './app/app';

export function main() {
  @NgModule({
    bootstrap: [ App ],
    declarations: [ App ],
    imports: [
      UniversalModule,
      FormsModule
    ],
  })
  class MainModule {
  }
  return MainModule;
}
