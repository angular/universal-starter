import { Injectable } from '@angular/core';

@Injectable()
export class CookieNode {

  set(name: string, value: string, expireDays: number, path: string = ""): void {
    console.log('Ignoring service side cookie management!');
  }

  get(name: string): string {
    return Zone.current.get('req').cookies[name];
  }

}
