import { Component, Inject, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'starter-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnDestroy {

  private logoutSubscription: any;

  constructor(public auth: AuthService, private _router: Router) {

  }

  ngOnDestroy() {
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }

  logout(): void {
    console.log('logout');
    this.logoutSubscription = this.auth.logout().subscribe(() => {
      this._router.navigate(['/home']);
    });
  }

}
