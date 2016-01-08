import {Component, Directive, ElementRef, Renderer} from 'angular2/core';


@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // we must interact with the dom through Renderer for webworker/server to see the changes
    renderer.setElementStyle(element, 'fontSize', 'x-large');
  }
}


@Component({
  selector: 'app',
  directives: [ XLarge ],
  template: `
  <div>
    <div>
      <span x-large>Hello, {{ name }}!</span>
    </div>

    name: <input type="text" [value]="name" (input)="name = $event.target.value" autofocus>
  </div>
  `
})
export class App {
  name: string = 'AngularConnect';
}


