import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {App} from '../app';

@Component({
  selector: 'html',
  styles: [`
    nav { background:#158126; min-height:40px; border-bottom:5px #046923 solid; }
    nav a { font-weight:bold; text-decoration:none; color:#fff; padding:20px; display:inline-block; }
    nav a:hover { background:#00AF36; }
  `],
  directives: [
    ...ROUTER_DIRECTIVES,
    App
  ],
  template: `
<head>
  <title>Angular 2 Universal Starter</title>
  <meta charset="UTF-8">
  <meta name="description" content="Angular 2 Universal">
  <meta name="keywords" content="Angular 2,Universal">
  <meta name="author" content="PatrickJS">

  <universal-styles></universal-styles>

  <link rel="icon" href="data:;base64,iVBORw0KGgo=">

</head>
<body>

  <button onclick="APP.bootstrap(); this.remove()">BOOTSTRAP CLIENT</button>
  <nav>
    <a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Home</a>
    <a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./about'] ">About</a>
    <span style="color: white">[server rendered]</span>
  </nav>

  <app>
    Loading Universal ...
  </app>

  <!--
  <script src="index.js"></script>
  -->

</body>
  `
})
export class Html {
  constructor() {
    console.log('HTML');

  }
}
