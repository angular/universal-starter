import {NgModule, Component} from '@angular/core'
import {RouterModule} from '@angular/router'

@Component({
  selector: 'lazy-view',
  template: `<h3>i'm lazy</h3>`
})
export class LazyView {}

@NgModule({
  declarations: [LazyView],
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyView, pathMatch: 'full'}
    ])
  ]
})
export class LazyModule {

}
