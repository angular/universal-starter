import { RouterConfig } from '@angular/router';
import {Home} from './home';
import {About} from './app.component';

export const routes: RouterConfig = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'about', component: About },
  { path: '**', redirectTo: 'home' }
];
