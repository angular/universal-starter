import { About } from './about.component';

import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router';

const routes:Routes=[];

@NgModule({
  declarations: [ About ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AboutModule {}
