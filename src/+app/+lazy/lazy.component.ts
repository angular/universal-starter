import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'lazy',
  template: `
    <p>
      Lazy component
    </p>
  `
})
export class LazyComponent {
}
