import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GithubSharedModule } from './shared/shared.module';

import { RepoBrowserComponent } from './repo-browser/repo-browser.component';
import { GithubRoutingModule } from './github-routing.module';

@NgModule({
  declarations: [
    RepoBrowserComponent
  ],
  imports: [
    SharedModule,
    GithubSharedModule.withProviders(),
  ]
})
export class GithubModule { }
