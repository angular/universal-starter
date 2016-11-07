import { Component } from '@angular/core';

import { ModelService } from '../shared/api.service';

@Component({
  selector: 'home',
  template: `
  Home component
  {{ data | json }}
  `
})
export class HomeComponent {
  data = {};
  constructor(public model: ModelService) {

    this.model.get('/data.json').subscribe(data => {
      this.data = data;
    });

  }

}
