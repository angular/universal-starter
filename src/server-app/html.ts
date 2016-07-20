import {Component} from '@angular/core';

import {App} from '../app';

@Component({
  selector: 'html',
  directives: [
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

  <app>
    Loading Universal ...
  </app>

  <script src="index.js"></script>

</body>
  `
})
export class Html {
  constructor() {
    console.log('HTML');

  }
}
