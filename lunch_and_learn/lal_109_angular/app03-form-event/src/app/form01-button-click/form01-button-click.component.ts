import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form01-button-click',
  templateUrl: './form01-button-click.component.html',
  styleUrls: ['./form01-button-click.component.css']
})
export class Form01ButtonClickComponent {
  message = 'Hello World';

  changeMessage() {
    this.message = `Message updated ${new Date()}`;
  }
}
