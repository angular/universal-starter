import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'todo', component: TodoComponent }
    ])
  ]
})
export class TodoRoutingModule { }
