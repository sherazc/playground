import { Component, OnInit } from '@angular/core';

const DEFAULT_MESSAGE = 'Bye';

@Component({
  selector: 'app-form02-form-submit',
  templateUrl: './form02-form-submit.component.html',
  styleUrls: ['./form02-form-submit.component.css']
})
export class Form02FormSubmitComponent {
  message: string;

  constructor() {
    this.message = DEFAULT_MESSAGE;
  }

  changeMessage(personName: string) {
    if (personName) {
      this.message = `Hello ${personName}`;
    } else {
      this.message = DEFAULT_MESSAGE;
    }
    return false;
  }
}
