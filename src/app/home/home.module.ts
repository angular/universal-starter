import { Home } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router';

const routes:Routes=[];

@NgModule({
  declarations: [ Home ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {}
