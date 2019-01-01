
import {NgModule, NgModuleFactoryLoader} from '@angular/core';

import * as routes from './app-routing.module';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {LazyModuleNgFactory} from './lazy/lazy.module.ngfactory';

export class MyLoader extends NgModuleFactoryLoader {
  load(id: string) {
    switch (id) {
      case routes.lazyModuleId:
        return Promise.resolve(LazyModuleNgFactory);
      default:
        throw new Error(`Unrecognized route id ${id}`);
    }
  }
}

@NgModule({
  imports: [AppModule],
  bootstrap: [AppComponent],
  providers: [{provide: NgModuleFactoryLoader, useClass: MyLoader}]
})
export class AppModuleDev {
}
