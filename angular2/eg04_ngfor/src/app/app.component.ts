import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello</h1>
    <button (click)="addItem()">Add Item</button>
    <ol>
      <li *ngFor="let item of items">
        {{item}}
      </li>
    </ol>
  `,
})
export class AppComponent {
  items: string[] = ["Sheraz", "Tariq", "Chaudhry"];
  addItem(): void {
    this.items.push("item");
  }
}
