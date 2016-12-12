import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeModule } from './+home/home.module';
import { AboutModule } from './+about/about.module';
import { TodoModule } from './+todo/todo.module';
import { LoginModule } from './+login/login.module';
import { ProfileModule } from './+profile/profile.module';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';

import { AuthGuard } from './shared/auth/auth.guard';

@NgModule({
  declarations: [AppComponent, XLargeDirective],
  imports: [
    SharedModule,
    HomeModule,
    AboutModule,
    TodoModule,
    LoginModule,
    ProfileModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AppModule {
}

export { AppComponent } from './app.component';
