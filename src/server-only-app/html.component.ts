import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

// Require our Universal App
import {App, Home, About} from '../app/app.component';

@Component({
  selector: 'html',
  directives: [
    App
  ],
  providers: [

  ],
  template: `
  <head>
    <title>{{ seo.title }}</title>
    <meta charset="UTF-8">
    <meta name="description" content="Angular 2 Universal">
    <meta name="keywords" content="Angular 2,Universal">
    <meta name="author" content="PatrickJS">
    <title>Angular 2 Universal Starter</title>
    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
    <base href="/">
  </head>
  <body>

    <app>
      Loading...
    </app>
    <server-only-app>
      Loading...
    </server-only-app>

    <script async src="/dist/client/bundle.js"></script>
  </body>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home', useAsDefault: true },
  { path: '/home', component: Home, name: 'Home' },
  { path: '/about', component: About, name: 'About' },
  { path: '/**', redirectTo: ['Home'] }
])
export class Html {
  seo = {
    title: 'Angular 2 Universal Starter - this component replaces the title element'
  };
}
