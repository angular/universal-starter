import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CacheService } from './cache.service';

@Injectable()
export class StorageService {

  constructor(private cache: CacheService, @Inject('StorageProvider') private storageProvider) {

  }

  set(key: string, value: string): void {
    this.cache.set(key, value);
    this.storageProvider.set(key, value);
  }

  get(key: string): string {
    let value = this.cache.get(key);
    if (value === undefined) {
      value = this.storageProvider.get(key);
    }
    return value;
  }

  remove(key: string): void {
    this.storageProvider.remove(key);
  }

  clear(): void {
    this.storageProvider.clear();
  }

}
