import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ModelService } from '../shared/model/model.service';
import { Todo } from './todo.schema'


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'todo',
  styleUrls: [ './todo.component.css' ],
  templateUrl: './todo.component.html'
})
export class TodoComponent {

  todos: Todo[];
  newTodo: Todo;
  newValue = '';

  constructor(public model: ModelService) {
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit();
  }

  addTodo() {
    this.newTodo = new Todo(
      this.todos.length,
      new Date(),
      this.newValue,
      false
    );
    this.todos.push(this.newTodo);
    this.newValue = '';
  }

  universalInit() {
    this.model
      .get('/api/todos')
      .subscribe(data => {
        console.log(data);
        this.todos = data;
    });
  }

}
