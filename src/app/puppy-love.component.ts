import { Component } from '@angular/core';
import {MdToolbar} from '@angular2-material/toolbar';
import {MdButton} from '@angular2-material/button';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MdInput} from '@angular2-material/input';
import {MdCheckbox} from '@angular2-material/checkbox';
import {MdRadioButton, MdRadioGroup, MdRadioDispatcher} from '@angular2-material/radio';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';

@Component({
  selector: 'puppy-love-app',
  providers: [MdIconRegistry, MdRadioDispatcher],
  styles: [`
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .secondary {
      color: rgba(0,0,0,0.54);
    }

    [md-fab] {
      position: absolute;
      right: 3%;
      top: 34px;
      z-index: 1;
    }

    md-sidenav-layout {
      background: rgba(0,0,0,0.03);
    }

    md-input {
      margin: 8px 0;
      width: 100%;
    }

    md-radio-button, md-checkbox {
      margin: 16px 8px;
    }

    .form {
      display: flex;
    }

    .form md-card {
      flex-grow: 1;
    }

    md-card {
      width: 400px;
      box-sizing: border-box;
      margin: 16px;
    }

    .card-container {
      display: flex;
      flex-flow: row wrap;
    }
  `],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdToolbar,
    MdButton,
    MdInput,
    MdCheckbox,
    MdRadioGroup,
    MdRadioButton,
    MdIcon
  ],
  template: `
  <md-sidenav-layout fullscreen>
    <md-sidenav #sidenav>
      <md-nav-list>
        <a md-list-item *ngFor="let view of views">
          <md-icon md-list-icon>{{view.icon}}</md-icon>
          <span md-line>{{view.name}}</span>
          <span md-line class="secondary">{{view.description}}</span>
        </a>
      </md-nav-list>
    </md-sidenav>
    <md-toolbar color="primary">
      <button md-icon-button (click)="sidenav.open()">
        <md-icon>menu</md-icon>
      </button>
      Puppy Love
      <button md-fab (click)="formShowing=!formShowing">
        <md-icon>add</md-icon>
      </button>
    </md-toolbar>

    <div class="form" *ngIf="formShowing">
      <md-card>
        <md-card-title>Create your dog's profile</md-card-title>
        <md-card-content>
          <form>
            <md-input placeholder="Name"></md-input>
            <md-input placeholder="Favorite toy"></md-input>
            <md-input placeholder="Description"></md-input>
            <md-radio-group>
              <md-radio-button value="Looking for love">Looking for love</md-radio-button>
              <md-radio-button value="Just browsing">Just browsing</md-radio-button>
            </md-radio-group>
            <div>
              <md-checkbox indeterminate="true">Is a good dog</md-checkbox>
            </div>
          </form>
        </md-card-content>
        <md-card-actions align="end">
          <button md-raised-button color="accent">POST</button>
        </md-card-actions>
      </md-card>
    </div>

    <div class="card-container">
      <md-card *ngFor="let dog of dogs">
        <img md-card-image [alt]="dog.name" src="https://material.angularjs.org/material2_assets/ngconf/{{dog.name}}.png">
        <md-card-title>{{dog.name}}</md-card-title>
        <md-card-content class="secondary">
          Very ipsum such dolor amet wow very divs very content concern, very much develop much spans
          much layer so so scare such spans such padding many beta very layer much excuse.
        </md-card-content>
        <md-card-actions align="end">
          <button md-button color="primary">SNIFF</button>
          <button md-button color="primary">WOOF</button>
        </md-card-actions>
      </md-card>
    </div>

  </md-sidenav-layout>
  `,
})
export class PuppyLoveAppComponent {
  formShowing: boolean = false;
  views: Object[] = [
    {
      name: "My Account",
      description: "Edit my account information",
      icon: "assignment ind"
    },
    {
      name: "Potential dates",
      description: "Find your soulmate!",
      icon: "pets"
    }
  ];
  dogs: Object[] = [
    {name: "Porter"},
    {name: "Mal"},
    {name: "Razzle"},
    {name: "Koby"},
    {name: "Molly"},
    {name: "Husi"}
  ];
}
