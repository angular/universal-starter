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

// everything here is for AoT reasons
export function getAboutModule() {
  return getAsyncModule('AboutModule', 'about');
}

export function getHomeModule() {
  return getAsyncModule('HomeModule', 'home');
}
export function getLazyModule() {
  return getAsyncModule('LazyModule', 'lazy');
}

export function getTodoModule() {
  return getAsyncModule('TodoModule', 'todo');
}

export function getGithubModule() {
  return getAsyncModule('GithubModule', 'github');
}

// We must hardcode everything for ngc AoT support until webpack version of ngc works
// this can be done in a webpack-loader that we will add later
export function getAsyncModule(AsyncModule, path) {
  let ngmodule = AsyncModule + (process.env.AOT ? 'NgFactory' : '');

  // sync route if it's the current page route
  if (process.env.PAGE === path) {
    return (require('./+' + path + '/' + path + '.module' + (process.env.AOT ? '.ngfactory' : ''))[ngmodule])
  }
  // force sync all routes for development
  if (process.env.NODE_ENV !== 'prod') {
    return (require('./+' + path + '/' + path + '.module' + (process.env.AOT ? '.ngfactory' : ''))[ngmodule])
  }
  // async route for everything else
  return System.import('./+' + path + '/' + path + '.module' + (process.env.AOT ? '.ngfactory' : '')).then(mod => mod[ngmodule]);
}
