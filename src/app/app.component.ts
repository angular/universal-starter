import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <div><a routerLink="/home">Home</a>
  <a routerLink="/about">About</a></div>
  <p>Hello Angular Universal App</p>
  
  <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
