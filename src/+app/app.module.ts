import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule, isBrowser, isNode, AUTO_PREBOOT } from 'angular2-universal/browser'; // for AoT we need to manually split universal packages

import { HomeModule } from './+home/home.module';
import { AboutModule } from './+about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

export { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    SharedModule,
    HomeModule,
    AboutModule,
    AppRoutingModule
  ]
})
export class AppModule {
}
