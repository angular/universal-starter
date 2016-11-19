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
      <form #f="ngForm" (ngSubmit)="addTodo(newTodo)">
        <input name="newTodo" [(ngModel)]="newTodo">
        <button>Submit</button>
      </form>
      <ul>
        <li *ngFor="let todo of todos">
          {{ todo }}
        </li>
      </ul>
    </div>
  `
})
export class TodoComponent {
  newTodo = '';
  todos = [];
  constructor(public model: ModelService) {
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit();
  }

  addTodo(newTodo) {
    this.todos.push(newTodo);
    this.newTodo = '';
  }

  universalInit() {
  }

}
