import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { About } from './app.component';

export const routes: RouterConfig = [
  { path: '', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: '**', redirectTo: 'home' }
];
