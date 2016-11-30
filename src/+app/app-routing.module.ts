import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'about',  loadChildren: getAboutModule },
      { path: 'home',   loadChildren: getHomeModule },
      { path: 'lazy',   loadChildren: getLazyModule },
      { path: 'todo',   loadChildren: getTodoModule },
      { path: 'github', loadChildren: getGithubModule }
    ])
  ],
})
export class AppRoutingModule { }

// We must hardcode everything for ngc AoT support until webpack version of ngc works
// this can be done in a webpack-loader that we will add later
export function getAboutModule() {
  let ngmodule = 'AboutModule' + (process.env.AOT ? 'NgFactory' : '');

  if (process.env.PAGE === 'about') {
    return (require('./+about/about.module' + (process.env.AOT ? '.ngfactory' : ''))[ngmodule])
  }

  return System.import('./+about/about.module' + (process.env.AOT ? '.ngfactory' : '')).then(mod => mod[ngmodule]);
}

export function getHomeModule() {
  let ngmodule = 'HomeModule' + (process.env.AOT ? 'NgFactory' : '');

  if (process.env.PAGE === 'home') {
    return (require('./+home/home.module' + (process.env.AOT ? '.ngfactory' : ''))[ngmodule])
  }

  return System.import('./+home/home.module' + (process.env.AOT ? '.ngfactory' : '')).then(mod => mod[ngmodule]);
}

export function getLazyModule() {
  let ngmodule = 'LazyModule' + (process.env.AOT ? 'NgFactory' : '');

  if (process.env.PAGE === 'lazy') {
    return (require('./+lazy/lazy.module' + (process.env.AOT ? '.ngfactory' : ''))[ngmodule])
  }

  return System.import('./+lazy/lazy.module' + (process.env.AOT ? '.ngfactory' : '')).then(mod => mod[ngmodule]);
}

export function getTodoModule() {
  let ngmodule = 'TodoModule' + (process.env.AOT ? 'NgFactory' : '');

  if (process.env.PAGE === 'todo') {
    return (require('./+todo/todo.module' + (process.env.AOT ? '.ngfactory' : ''))[ngmodule])
  }

  return System.import('./+todo/todo.module' + (process.env.AOT ? '.ngfactory' : '')).then(mod => mod[ngmodule]);
}

export function getGithubModule() {
  let ngmodule = 'GithubModule' + (process.env.AOT ? 'NgFactory' : '');

  if (process.env.PAGE === 'github') {
    return (require('./+github/github.module' + (process.env.AOT ? '.ngfactory' : ''))[ngmodule])
  }

  return System.import('./+github/github.module' + (process.env.AOT ? '.ngfactory' : '')).then(mod => mod[ngmodule]);
}
