import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { ModelService } from './model/model.service';

const MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule
];

const PIPES = [
  // put pipes here
];

const COMPONENTS = [
  // put shared components here
];

const PROVIDERS = [
  ModelService,
  ApiService
]

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
