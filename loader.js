importScripts("/node_modules/systemjs/dist/system.src.js",
              "/node_modules/angular2/bundles/web_worker/worker.dev.js");
System.config({
    packages: {
      "app": {
        defaultExtension: "js"
      }
    }
});
console.time('loader.js');
System.import("/__build__/background");
console.timeEnd('loader.js');
