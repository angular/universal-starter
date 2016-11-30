import { NgModule, ModuleWithProviders } from '@angular/core';

import { GithubService } from './github.service';

export const PROVIDERS = [
  GithubService
];

@NgModule({
})
export class GithubSharedModule {
  static withProviders(): ModuleWithProviders {
    return { ngModule: GithubSharedModule, providers: PROVIDERS }
  }
}
