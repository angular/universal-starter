import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GithubService} from '../shared/github.service';

@Component({
  selector: 'repo-detail',
  styleUrls: ['./repo-detail.component.css'],
  templateUrl: './repo-detail.component.html'
})
export class RepoDetailComponent implements OnInit {
  _org: string;
  _repo: string;
  repoDetails: any = {};

  constructor(public github:GithubService, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._org = this.route.snapshot.parent.params['org'];
      this._repo = params['repo'] || '';

      if (this._repo) {
        this.github.getRepoForOrg(this._org, this._repo)
          .subscribe(repoDetails => {
            this.repoDetails = repoDetails;
          });
      }
    });
  }
}
