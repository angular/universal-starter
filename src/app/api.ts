import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { Cache  } from './universal-cache';

@Injectable()
export class ApiService {

  constructor(public _http: Http, public _cache: Cache) {

  }
  // whatever domain/feature method name
  getModel(url) {
    // you want to return the cache if there is a response in it. This would cache the first response so if your API isn't idempotent you probably want to remove the item from the cache after you use it. LRU of 1
    let key = url;
    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    // you probably shouldn't .share() and you should write the correct logic
    return this._http.get(url)
      .map(res => res.json())
      .do(json => {
        this._cache.set(key, json);
      })
      .share();
  }
}
