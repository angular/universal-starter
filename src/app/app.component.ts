import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http';

// templateUrl example
import { Home } from './home';
//
/////////////////////////
// ** Example Directive
// Notice we don't touch the Element directly

@Directive({
  selector: '[x-large]'
})
export class XLarge {
  constructor(element: ElementRef, renderer: Renderer) {
    // ** IMPORTANT **
    // we must interact with the dom through -Renderer-
    // for webworker/server to see the changes
    renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
    // ^^
  }
}

/////////////////////////
// ** Example Components
@Component({
  selector: 'about',
  template: `
    <div>This is the "About" page</div>
  `
})
export class About { }

/////////////////////////
// ** MAIN APP COMPONENT **
@Component({
  selector: 'app', // <app></app>
  directives: [
    ...ROUTER_DIRECTIVES,
    XLarge
  ],
  styles: [`
    * { padding:0; margin:0; }
    #universal { text-align:center; font-weight:bold; padding:15px 0; }
    nav { background:#158126; min-height:40px; border-bottom:5px #046923 solid; }
    nav a { font-weight:bold; text-decoration:none; color:#fff; padding:20px; display:inline-block; }
    nav a:hover { background:#00AF36; }
    .hero-universal { min-height:500px; display:block; padding:20px; background: url('/assets/logo.png') no-repeat center center; }
    .inner-hero { background: rgba(255, 255, 255, 0.75); border:5px #ccc solid; padding:25px; }
    .router-link-active { background-color: #00AF36; }
    blockquote { border-left:5px #158126 solid; background:#fff; padding:20px 20px 20px 40px; }
    blockquote::before { left: 1em; }
    main { padding:20px 0; }
    pre { font-size:12px; }
  `],
  template: `
  <h3 id="universal">Angular2 Universal</h3>
  <nav>
    <a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./home'] ">Home</a>
    <a [routerLinkActive]="['active', 'router-link-active']" [routerLink]=" ['./about'] ">About</a>
  </nav>
  <div class="hero-universal">
    <div class="inner-hero">
      <div>
        <span x-large>Universal JavaScript {{ title }}!</span>
      </div>

      Two-way binding: <input type="text" [value]="title" (input)="title = $event.target.value" autofocus>
      <br><br>

      <strong>Async data call return value:</strong>
      <pre>{{ data | json }}</pre>

      <strong>Router-outlet:</strong>
      <main>
        <router-outlet></router-outlet>
      </main>

      <blockquote>{{ server }}</blockquote>
    </div>
  </div>
  `
})
export class App {
  title: string = 'ftw';
  data = {};
  server: string;

  constructor(public http: Http) { }

  ngOnInit() {
    // limit the use of setTimeouts
    setTimeout(() => {
      this.server = 'This was rendered from the server!';
    }, 10);

    // use services for http calls
    this.http.get('/data.json')
      .subscribe(res => {
        this.data = res.json();
      });
  }

}
