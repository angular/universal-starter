import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { About, Parent, Child, AnotherChild } from './app.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: 'parent', component: Parent,
    children: [
      { path: '', component: Child },
      { path: 'another', component: AnotherChild }
    ]},
  { path: '**', redirectTo: 'home' }
];
