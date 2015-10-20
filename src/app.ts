import {Component} from 'angular2/angular2';

@Component({
  selector: 'app',
  template: `
  <div>
    <h1>Hello, {{ name }}!</h1>
    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
  </div>
  `
})
export class App {
  name: string = 'AngularConnect';
}


