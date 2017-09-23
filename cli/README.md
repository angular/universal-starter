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

## Development (Client-side only rendering)
* run `npm run start` which will start `ng serve`

## Production 
**`npm run build:dynamic && npm run serve:dynamic`** - Compiles your application and spins up a Node Express to dynamically serve your Universal application on `http://localhost:4000`.

**`npm run build:static && npm run serve:static`** - Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://127.0.0.1:8080`
**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`


This demo is built following this guide: https://github.com/angular/angular-cli/wiki/stories-universal-rendering
Along with https://github.com/angular/universal/tree/master/modules/ng-module-map-ngfactory-loader to enable Lazy Loading