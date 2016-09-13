import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';

import { App } from './app/app';

export function main(config) {

  @NgModule({
    bootstrap: [ App ],
    declarations: [ App ],
    imports: [
      UniversalModule.withConfig({
        document: config.document,
        originUrl: 'http://localhost:3000',
        baseUrl: '/',
        requestUrl: '/',
        // preboot: false,
        preboot: { appRoot: ['app'], uglify: true },
      }),
      FormsModule
    ]
  })
  class MainModule {}

  return MainModule
};
