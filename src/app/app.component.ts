import { Component, OnInit } from '@angular/core';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { REQUEST } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'demo-app',
  template: `
    <h1>Universal Demo using Angular</h1>
    <a routerLink="/">Home</a>
    <a routerLink="/lazy">Lazy</a>
    <router-outlet></router-outlet>
  `,
  styles: [
    `h1 {
      color: green;
    }`
  ]
})
export class AppComponent implements OnInit {
  constructor(private cache: TransferState) { }

  ngOnInit() {
    // This is an example
    this.cache.set('message', 'Hello World');
  }
}
