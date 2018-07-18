import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h3>ss{{ message }}</h3>`
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor() {}

  ngOnInit() {
    this.message = 'Hello';
  }
}
