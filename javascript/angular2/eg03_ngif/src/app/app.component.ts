import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Click Button to toggle</h1>
    <button (click)="toggleShowA()">Show {{showA ? "B" : "A"}}</button>
    <div *ngIf="showA"
      style="background: orange;">
      Content A
    </div>
    <div *ngIf="!showA"
      style="background: cornflowerblue;">
      Content B
    </div>
  `,
})
export class AppComponent {
  showA: boolean = true;
  toggleShowA(): void {
    this.showA = !this.showA;
  }
}
