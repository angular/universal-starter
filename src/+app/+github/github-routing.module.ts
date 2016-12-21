import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RepoBrowserComponent } from './repo-browser/repo-browser.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoDetailComponent } from './repo-detail/repo-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: RepoBrowserComponent,
        children: [
          { path: '', component: RepoListComponent },
          { path: ':org', component: RepoListComponent,
            children: [
              { path: '', component: RepoDetailComponent },
              { path: ':repo', component: RepoDetailComponent }
            ]
          }]
      },
    ])
  ]
})
export class GithubRoutingModule { }
