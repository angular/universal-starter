import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store  } from '../../backend/store';

@Injectable()
export class NodeStorageProviderService {

  set(key: string, value: any): void {
    Store.set(key, value);
  }

  get(key: string): string {
    return Store.get(key);
  }

  remove(key: string): void {
    Store.remove(key);
  }

  clear(): void {
    Store.clear();
  }

}
