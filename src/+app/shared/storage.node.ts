import { Injectable } from '@angular/core';

import { Store  } from '../../backend/store';

@Injectable()
export class NodeStorage {

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
