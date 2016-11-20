import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TodoComponent } from './todo.component';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TodoRoutingModule
  ],
  declarations: [
    TodoComponent
  ]
})
export class TodoModule { }
