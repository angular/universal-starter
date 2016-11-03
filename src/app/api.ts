import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService  } from './universal-cache';

export function hashCode(str) {
  let hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

@Injectable()
export class ApiService {
  constructor(public _http: Http) {

  }

 /**
  * whatever domain/feature method name
  */
  get(url: string, options?: any) {
    return this._http.get(url, options)
      .map(res => res.json())
      .catch(err => {
        console.log('Error: ', err);
        return Observable.throw(err);
      });
  }

}

@Injectable()
export class ModelService {

  constructor(public _api: ApiService, public _cache: CacheService) {

  }

 /**
  * whatever domain/feature method name
  */
  get(url) {
    // you want to return the cache if there is a response in it. This would cache the first response so if your API isn't idempotent you probably want to remove the item from the cache after you use it. LRU of 1
    let key = url;

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    // you probably shouldn't .share() and you should write the correct logic
    return this._api.get(url)
      .do(json => {
        this._cache.set(key, json);
      })
      .share();
  }

}
