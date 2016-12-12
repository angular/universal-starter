import { Injectable } from '@angular/core';

@Injectable()
export class ClientStorageProviderService {

  // TODO: serialize any to string on put and desieralize on get

  // TODO: make optional between localStorage and sessionStorage

  set(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  get(key: string): string {
    return sessionStorage.getItem(key);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

}
