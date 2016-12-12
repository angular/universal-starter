import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StorageService {

  constructor( @Inject('StorageProvider') private storageProvider) {

  }

  set(key: string, value: string): void {
    this.storageProvider.set(key, value);
  }

  get(key: string): string {
    return this.storageProvider.get(key);
  }

  remove(key: string): void {
    this.storageProvider.remove(key);
  }

  clear(): void {
    this.storageProvider.clear();
  }

}
