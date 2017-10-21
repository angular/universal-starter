# Angular Universal & Anguar-CLI minimal starter

> This demo is built following the [Angular-CLI Wiki guide](https://github.com/angular/angular-cli/wiki/stories-universal-rendering)

We're utilizing packages from the [Angular Universal @nguniversal](https://github.com/angular/universal) repo, such as [ng-module-map-ngfactory-loader](https://github.com/angular/universal/tree/master/modules/module-map-ngfactory-loader) to enable Lazy Loading.

---

## Static or Dynamic
This repo demonstrates the use of 2 different forms of Server Side Rendering.

**Static** Also known as "prerendering"
* Happens at build time
* Renders your application and replaces the dist index.html with a version rendered at the route `/`.

**Dynamic**
* Happens at runtime
* Uses `ngExpressEngine` to render you application on the fly at the requested url.

---

## Installation
* `npm install` or `yarn`

---

## Development (Client-side only rendering)
* run `npm run start` which will start `ng serve` (project served at the standard: localhost:4200)

---

## Production 

Depending on whether you're publishing dynamic or static prerendering, run the build command, and then serve up your dist folder assets.

> **NOTE**: To deploy your **Static** site to a static hosting platform you will have to deploy the *`dist/browser`* folder, rather than the usual *`dist`*

ie: `npm run build:dynamic` or `npm run build:static`. All of the files that need to be served will be found within the `/dist` folder.



---

## Testing Universal (dynamic or static) builds -Locally-

**Dynamic** : **`npm run start:dynamic`**

Compiles your application and spins up a Node Express to dynamically serve your Universal application on `http://localhost:4000`.

**Static** : **`npm run start:static`**

- Compiles your application and prerenders your applications files, spinning up a demo http-server so you can view it on `http://127.0.0.1:8080`


