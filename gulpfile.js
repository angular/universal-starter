//dependencies
var gulp  = require('gulp');
var util  = require('gulp-util');
var watch = require('gulp-watch');
var nodemon = require('gulp-nodemon');
var del = require('del');
var ts = require('gulp-typescript');
var SystemBuilder = require('systemjs-builder');

var systemConfig = require('./system.config.js');
var tsConfig = require('./tsconfig.json');

//Typescript Config;
var tsProject = ts.createProject(tsConfig.compilerOptions);


//copy html/css/js files
gulp.task('copy:src', function() {
  return gulp.src([
      'src/assets',
      'src/client.js',
      'system.config.js',
      'src/index.html',
      'src/**/*.html',
      'src/**/*.css'
    ])
    .pipe(gulp.dest('dist'))
    // .pipe(connect.reload());
});

//clean the dist folder
gulp.task('clean', function() {
  return del(['dist']);
})

//clean angular2 typings
gulp.task('clean:ng2', function(cb) {
  return del(['node_modules/angular2/manual_typings']);
})

//compile app typescript files
gulp.task('compile:app', function() {
  return gulp.src([
      "tsd_typings/tsd.d.ts",
      "ng2.d.ts",
      'src/**/*.ts',
    ])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('dist'))

});

//live reload server
gulp.task('build', ['copy:src', 'compile:app']);

gulp.task('server', ['build', 'default'], function() {
  nodemon({
    watch: [
      'src'
    ],
    ext: 'js ts json html',
    script: 'dist/server.js'
  })
  .on('restart', function () {
    gulp.run(['build']);
  });
});

//default task
gulp.task('default', function() {
  gulp.watch(['src/**/*.ts'], ['compile:app']);
  gulp.watch(['src/**/.js', 'src/**/*.html'], ['copy:src']);
});
