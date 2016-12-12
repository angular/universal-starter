import { Injectable } from '@angular/core';

@Injectable()
export class CookieBrowser {

  // TODO: improve

  set(name: string, value: string, expireDays: number, path: string = ""): void {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = "expires=" + d.toUTCString();
    window.document.cookie = name + "=" + value + "; " + expires + (path.length > 0 ? "; path=" + path : "");
  }

  get(name: string): string {
    let ca: Array<string> = window.document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = name + '=';
    let cookie: string = '';
    for (let i: number = 0; i < caLen; i += 1) {
      cookie = ca[i].replace(/^\s\+/g, '');
      if (cookie.indexOf(cookieName) == 0) {
        cookie = cookie.substring(cookieName.length, cookie.length);
        break;
      }
    }
    return cookie;
  }

  remove(name: string): void {
    this.set(name, "", -1);
  }

}
