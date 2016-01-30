import gulp = require('gulp');
import {REQUEST_URL, SERVER_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {provide, enableProdMode} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

var ngPreRender = require('angular2-gulp-prerender');

import {App} from './src/app/app';

enableProdMode();

gulp.task('prerender', () => {

  return gulp.src('./src/index.html')
    .pipe(ngPreRender({
      App,
      providers: [
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(REQUEST_URL, {useValue: '/'}),
        ROUTER_PROVIDERS,
        SERVER_LOCATION_PROVIDERS,
      ],
      preboot: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch:prerender', () => {
  gulp.watch(['./src/index.html', './src/app/**'], ['prerender']);
});

gulp.task('default', ['prerender'], () => {
  console.log('welcome');
});
