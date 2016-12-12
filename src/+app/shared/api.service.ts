import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CacheService  } from './cache.service';
import { StorageService  } from './storage.service';

@Injectable()
export class ApiService {

  private _token: string;

  private tokenSubject: Subject<string>;

  constructor(public _http: Http, private cache: CacheService, private storage: StorageService) {
    this.tokenSubject = new Subject<string>();
  }

  /**
   * whatever domain/feature method name
   */
  get(url: string, options?: any) {
    return this._http.get(url, options)
      .map(res => res.json())
      .catch(err => {
        console.error('Error: ', err);
        return Observable.throw(err);
      });
  }

  authorizedGet(url: string) {
    return this._http.get(url, this.buildOptions(true))
      .map(res => res.json())
      .catch(err => {
        console.error('Error: ', err);
        return Observable.throw(err);
      });
  }

  post(url: string, body: any): any {
    return this._http.post(url, body, this.buildOptions(false))
      .map(res => res.json())
      .catch(err => {
        console.error('Error: ', err);
        return Observable.throw(err);
      });
  }

  private buildOptions(authorized?: boolean): RequestOptions {
    return new RequestOptions({
      headers: this.buildHeaders(authorized)
    });
  }

  private buildHeaders(authorized?: boolean): Headers {
    let headers = new Headers();
    let headerArray = [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Accept', value: 'application/json' }
    ];
    if (authorized) {
      headerArray = headerArray.concat({
        key: "Authorization",
        value: this.token
      });
    }
    headerArray.forEach((header) => {
      headers.append(header.key, header.value);
    });
    return headers;
  }

  get token(): string {
    return this._token;
  }

  set token(token: string) {
    this._token = token;
    this.tokenSubject.next(this.token);
    this.cache.set('token', this.token);
    this.storage.set('token', this.token);
  }

  get observableToken(): Observable<string> {
    return this.tokenSubject.asObservable();
  }

}
