import { Inject, Injectable, isDevMode } from '@angular/core';

@Injectable()
export class CacheService {
  static KEY = 'CacheService';

  constructor(@Inject('LRU') public _cache: Map<string, any>) {

  }

  /**
   * check if there is a value in our store
   */
  has(key: string | number): boolean {
    let _key = this.normalizeKey(key);
    return this._cache.has(_key);
  }

  /**
   * store our state
   */
  set(key: string | number, value: any): void {
    let _key = this.normalizeKey(key);
    this._cache.set(_key, value);
  }

  /**
   * get our cached value
   */
  get(key: string | number): any {
    let _key = this.normalizeKey(key);
    return this._cache.get(_key);
  }

  /**
   * release memory refs
   */
  clear(): void {
    this._cache.clear();
  }

  /**
   * convert to json for the client
   */
  dehydrate(): any {
    let json = {};
    this._cache.forEach((value: any, key: string) => json[key] = value);
    return json;
  }

  /**
   * convert server json into out initial state
   */
  rehydrate(json: any): void {
    Object.keys(json).forEach((key: string) => {
      let _key = this.normalizeKey(key);
      let value = json[_key];
      this._cache.set(_key, value);
    });
  }

  /**
   * allow JSON.stringify to work
   */
  toJSON(): any {
    return this.dehydrate();
  }

  /**
   * convert numbers into strings
   */
  normalizeKey(key: string | number): string {
    if (isDevMode() && this._isInvalidValue(key)) {
      throw new Error('Please provide a valid key to save in the CacheService');
    }

    return key + '';
  }

  _isInvalidValue(key): boolean {
    return key === null ||
      key === undefined ||
      key === 0 ||
      key === '' ||
      typeof key === 'boolean' ||
      Number.isNaN(<number>key);
  }
}
