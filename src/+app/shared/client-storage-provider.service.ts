import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiService  } from './api.service';

@Injectable()
export class ClientStorageProviderService {

  // TODO: serialize any to string on put and desieralize on get

  // TODO: make optional between localStorage and sessionStorage

  constructor(private _api: ApiService) {

  }

  set(key: string, value: any): void {
    this._api.post('/store/set/' + key, { value: value }).subscribe(() => {
      localStorage.setItem(key, value);
    });
  }

  get(key: string): string {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    this._api.get('/store/remove/' + key).subscribe(() => {
      localStorage.removeItem(key);
    });
  }

  clear(): void {
    this._api.get('/store/clear').subscribe(() => {
      localStorage.clear();
    });
  }

}
