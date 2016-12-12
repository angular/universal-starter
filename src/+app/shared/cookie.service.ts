import { Inject, Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor( @Inject('Cookie') private cookie) {

  }

  set(name: string, value: string, expireDays: number, path: string = ""): void {
    this.cookie.set(name, value, expireDays, path);
  }

  get(name: string): string {
    return this.cookie.get(name);
  }

}
