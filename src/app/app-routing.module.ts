import {Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

export const lazyModuleId = './lazy/lazy.module#LazyModule';

// These are lazy-loaded routes - note that we don't import the modules here
// to avoid having an eager dependency on them.
const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule'},
  { path: 'lazy/nested', loadChildren: './lazy/lazy.module#LazyModule'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
