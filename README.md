<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/1016365/10639063/138338bc-7806-11e5-8057-d34c75f3cafc.png" alt="Universal Angular" height="320"/>
</p>

# Angular Universal Starter [![Universal Angular](https://img.shields.io/badge/universal-angular2-brightgreen.svg?style=flat)](https://github.com/angular/universal)
> Server-Side Rendering for Angular

A minimal Angular starter for Universal JavaScript using TypeScript and Webpack

> If you're looking for the Angular Universal repo go to [**angular/universal**](https://github.com/angular/universal)  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Getting Started
There are two projects hosting in this reposity: `/cli` and `/custom-webpack`, choose the one that best fits your situation.

## [cli](https://github.com/angular/universal-starter/tree/master/cli)
An implimentation of Universal using [@angular/cli](https://github.com/angular/angular-cli) to handle configuration.  
* Build config is already done for you
* Standard in the Angular community
* Less flexible than a custom build config

## [custom-webpack](https://github.com/angular/universal-starter/tree/master/custom-webpack)
An implimentation of Universal using a custom webpack configuration.  
* As flexible as possible
* Sometimes hard to debug since not everyone has the same config


## Universal "Gotchas"

> When building Universal components in Angular there are a few things to keep in mind.

 - **`window`**, **`document`**, **`navigator`**, and other browser types - _do not exist on the server_ - so using them, or any library that uses them (jQuery for example) will not work. You do have some options, if you truly need some of this functionality:
    - If you need to use them, consider limiting them to only your main.client and wrapping them situationally with the imported *isBrowser / isNode* features from Universal.  `import { isBrowser, isNode } from 'angular2-universal'`;
    - Another option is using `DOM` from ["@angular/platform-browser"](https://github.com/angular/angular/blob/e3687706c71beb7c9dbdae1bbb5fbbcea588c476/modules/%40angular/platform-browser/src/dom/dom_adapter.ts#L34)
 - **Don't manipulate the nativeElement directly**. Use the _Renderer_. We do this to ensure that in any environment we're able to change our view.
```
constructor(element: ElementRef, renderer: Renderer) {
  renderer.setElementStyle(element.nativeElement, 'font-size', 'x-large');
}
```
# License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)