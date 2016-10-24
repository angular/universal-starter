import { About } from './about/about.component';
import { Home } from './home/home.component';
import { Routes } from '@angular/router';

import { HomeComponent }  from './home.component';

export const routes:Routes=[
      {path: '', component: Home},
      {path: 'about', component: About},
      {path: 'home', component: Home}
];
