import {bootstrapWebWorker} from 'angular2/web_worker/worker';
import {App} from './app-worker';
console.log('background')
bootstrapWebWorker(App);
