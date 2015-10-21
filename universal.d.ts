declare module "angular2-universal-preview" {
  function ng2engineWithPreboot(): any;
  function ng2engine(): any;
  function bootstrap(component: any, providers?: any): any;
  var BASE_URL: any;
  var PRIME_CACHE: any;
  var HTTP_PROVIDERS: Array<any>;
}
