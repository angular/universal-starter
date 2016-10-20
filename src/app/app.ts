import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <p>Hello Angular Universal App</p>
  <router-outlet></router-outlet>
  `
})
export class App {

}

@Component({
  selector: 'home',
  template: 'Home component'
})
export class Home {

}
