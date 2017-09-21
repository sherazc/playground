import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form02-form-submit',
  templateUrl: './form02-form-submit.component.html',
  styleUrls: ['./form02-form-submit.component.css']
})
export class Form02FormSubmitComponent {
  static readonly DEFAULT_MESSAGE = 'Bye';
  message: string;

  constructor() {
    this.message = Form02FormSubmitComponent.DEFAULT_MESSAGE;
  }

  changeMessage(personName: string) {
    if (personName) {
      this.message = `Hello ${personName}`;
    } else {
      this.message = Form02FormSubmitComponent.DEFAULT_MESSAGE;
    }
    return false;
  }
}
