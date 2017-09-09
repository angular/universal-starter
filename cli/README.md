# Minimal Starter with the CLI

## Installation

* `npm install` or `yarn`

## Static or Dynamic

This repo demonstrates the use of 2 different forms of Server Side Rendering.

**Static** Also known as prerendering - This happens at build time; it renders your application and replaces the dist index.html with a rendered version.

**Dynamic** - This happens at runtime; you use Server Side Engine such as the `ngExpressEngine` to render your application as requests come in.

## Development
* run `npm run start` which will start `ng serve`

## Prod
* `npm run build:static` or `npm run build:dynamic` to compile your application for distribution

This demo is built following this guide: https://github.com/angular/angular-cli/wiki/stories-universal-rendering
Along with https://github.com/angular/universal/tree/master/modules/ng-module-map-ngfactory-loader to enable Lazy Loading