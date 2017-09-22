# Minimal Starter with the CLI

## Static or Dynamic

This repo demonstrates the use of 2 different forms of Server Side Rendering.

**Static** Also known as prerendering
* Happens at build time
* Renders your application and replaces the dist index.html with a version rendered at the route `/`.

**Dynamic**
* Happens at runtime
* Uses `ngExpressEngine` to render you application on the fly at the requested url.


## Installation
* `npm install` or `yarn`

## Development
* run `npm run start`

## Prod
* `npm run build:static` or `npm run build:dynamic`

## Local Demo
* `npm run serve:static` or `npm run serve:dynamic`
 

This demo is built following this guide: https://github.com/angular/angular-cli/wiki/stories-universal-rendering
Along with https://github.com/angular/universal/tree/master/modules/ng-module-map-ngfactory-loader to enable Lazy Loading