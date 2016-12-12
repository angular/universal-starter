import { Inject, Injectable } from '@angular/core';

import { CacheService } from './cache.service';

@Injectable()
export class StorageService {

  constructor(private cache: CacheService, @Inject('Storage') private storage) {

  }

  set(key: string, value: string): void {
    this.cache.set(key, value);
    this.storage.set(key, value);
  }

  get(key: string): string {
    let value = this.cache.get(key);
    if (value === undefined) {
      value = this.storage.get(key);
    }
    return value;
  }

  remove(key: string): void {
    this.storage.remove(key);
  }

  clear(): void {
    this.storage.clear();
  }

}
