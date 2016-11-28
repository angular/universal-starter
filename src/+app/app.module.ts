import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    XLargeDirective
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ]
})
export class AppModule {
}

export { AppComponent } from './app.component';
