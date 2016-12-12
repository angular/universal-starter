import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

import { AuthGuard } from '../shared/auth/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ProfileRoutingModule { }
