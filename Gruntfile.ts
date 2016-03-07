/*
 * grunt-angular2-prerender
 * https://github.com/angular/universal
 *
 * Copyright (c) 2016 Wassim Chegham
 * Licensed under the MIT license.
 */

import {REQUEST_URL, NODE_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {provide, enableProdMode} from 'angular2/core';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';
import {App} from './src/app/app';
enableProdMode();

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'dist/*.js'
      ],
      options: {}
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    'angular2-prerender': {
      default_options: {
        options: {
          App,
          providers: [
            provide(APP_BASE_HREF, { useValue: '/' }),
            provide(REQUEST_URL, { useValue: '/' }),
            ROUTER_PROVIDERS,
            NODE_LOCATION_PROVIDERS,
          ],
          preboot: true
        },
        files: {
          'tmp/default_options': [
            'src/index.html'
          ]
        }
      }
    }

  });

  //grunt.loadTasks('tasks');


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('angular2-grunt-prerender');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['angular2-prerender']);

};
