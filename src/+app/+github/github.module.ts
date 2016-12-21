import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { GithubSharedModule } from './shared/shared.module';


import { RepoBrowserComponent } from './repo-browser/repo-browser.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';


import { GithubRoutingModule } from './github-routing.module';

@NgModule({
  declarations: [
    RepoBrowserComponent,
    RepoListComponent,
    RepoDetailComponent
  ],
  imports: [
    SharedModule,
    GithubRoutingModule,
    GithubSharedModule.withProviders(),
  ]
})
export class GithubModule { }
