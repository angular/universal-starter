import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styles: [`
   .active {
     background-color: gray;
     color: white;
   }
  `],
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
    </nav>

    <p>Hello Angular Universal App</p>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {

}
