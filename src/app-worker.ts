import {Component} from 'angular2/web_worker/worker';

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


console.log('app-worker')
