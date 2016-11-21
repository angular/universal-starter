import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export function getLazyModule() {
  return System.import('./+lazy/lazy.module' + (process.env.AOT ? '.ngfactory' : ''))
    .then(mod => mod[(process.env.AOT ? 'LazyModuleNgFactory' : 'LazyModule')]);
}

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'lazy', loadChildren: getLazyModule }
    ])
  ],
})
export class AppRoutingModule { }
