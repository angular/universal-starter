import {Component, Directive} from 'angular2/core';


@Component({
  selector: 'title',
  template: `{{ seo }}`
})
export class Title {
  seo = 'Angular 2 Universal Starter - this component replaces the <title> element';
}


@Component({
  selector: 'server-only-app',
  template: `
  <footer>{{ seo }}</footer>
  `
})
export class ServerOnlyApp {
  seo = 'Angular 2 Universal';
}
