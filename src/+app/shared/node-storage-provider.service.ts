import { Injectable } from '@angular/core';

@Injectable()
export class NodeStorageProviderService {

  // TODO: setup redis servable available by configuration

  private store: Map<string, any>;

  constructor() {
    this.store = new Map<string, any>();
  }

  set(key: string, value: any): void {
    this.store.set(key, value);
  }

  get(key: string): string {
    return this.store.get(key);
  }

  remove(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

}
