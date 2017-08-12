import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello I am {{name}}</h1>
    <p>
      I am {{age}} years old
    </p>
    <button (click)="makeMeOlder()">Make me older</button>
    <button (click)="makeMeYonger()">Make me yonger</button>
  `,
})
export class AppComponent {
  name = 'Sheraz';
  age = 10;

  makeMeOlder():void {
    this.age++;
  }
  makeMeYonger(): void {
    this.age--;
  }
}
