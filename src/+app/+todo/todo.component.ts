import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'todo',
  styles: [`
  `],
  template: `
    <div class="todo">
      Todo component
    </div>
  `
})
export class TodoComponent {
  constructor(public model: ModelService) {
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit();
  }

  universalInit() {
  }

}
