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

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit();
  }

  universalInit() {
    this.model.get('/data.json').subscribe(data => {
      this.data = data;
    });
  }

}
