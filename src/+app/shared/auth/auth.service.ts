import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

import { ApiService  } from '../api.service';
import { StorageService } from '../storage.service';
import { CacheService } from '../cache.service';

import { Login } from './login.schema';
import { User } from './user.schema';

@Injectable()
export class AuthService {

  private _user: User;

  private userSubject: Subject<User>;

  constructor(private storage: StorageService, private cache: CacheService, private _api: ApiService) {
    this.userSubject = new Subject<User>();
    this._api.observableToken.subscribe((token: string) => {
      if (token) {
        this._api.authorizedGet('/api/user').subscribe(response => {
          this.user = new User(response);
        });
      }
      else {
        this.user = undefined;
      }
    });
    let token = this.cache.get('token');
    if (token) {
      this._api.token = token;
    }
    else {
      token = this.storage.get('token');
      if (token) {
        this._api.token = token;
      }
    }
  }

  login(data: Login) {
    return this._api.post('/api/login', data);
  }

  logout(): Observable<boolean> {
    return Observable.create((subscriber) => {
      this.user = undefined;
      this._api.token = undefined;
      this.cache.remove('token');
      this.storage.remove('token');
      subscriber.next(true);
      subscriber.complete();
    });
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
    this.userSubject.next(this.user);
  }

  get observableUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

}
