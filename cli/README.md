# Minimal Starter with the CLI

## Installation

* `npm install` or `yarn`

## Static or Dynamic

This repo demonstrates the use of 2 different forms of Server Side Rendering.

**Static** Also known as prerendering - This happens at build time; it renders your application and replaces the dist index.html with a rendered version.

**Dynamic** - This happens at runtime; you use Server Side Engine such as the `ngExpressEngine` to render your application as requests come in.

## Development (Client-side only rendering)
* run `npm run start` which will start `ng serve`

## Production 

**`npm run build:dynamic && npm run serve:dynamic`** - Compiles your application and spins up a Node Express to dynamically serve your Universal application on `http://localhost:4000`.

**`npm run build:static && npm run serve:static`** - Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://127.0.0.1:8080`

This demo is built following this guide: https://github.com/angular/angular-cli/wiki/stories-universal-rendering
Along with https://github.com/angular/universal/tree/master/modules/ng-module-map-ngfactory-loader to enable Lazy Loading