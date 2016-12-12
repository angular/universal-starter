import { Component, Inject, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';
import { ApiService } from '../shared/api.service';
import { CacheService  } from '../shared/cache.service';
import { StorageService  } from '../shared/storage.service';
import { Login } from '../shared/auth/login.schema';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'starter-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnDestroy {

  data: Login;

  private loginSubscription: any;

  constructor(public auth: AuthService, private cache: CacheService, private storage: StorageService, private _api: ApiService, private _router: Router) {
    this.data = new Login();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  login(): void {
    this.loginSubscription = this.auth.login(this.data).subscribe(response => {
      this.cache.set('token', response.token);
      this.storage.set('token', response.token);
      this._api.token = response.token;
      this.auth.observableUser.subscribe(() => {
        this._router.navigate(['/profile']);
      });
    });
  }

}
