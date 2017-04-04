import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Enter User name</h1>
    <p>Hit enter or click add button</p>
    <form (submit)="addUserName(inputVarName.value)">
      <input #inputVarName />
      <button (click)="addUserName(inputVarName.value)">Add</button>
    </form>
    <ol>
      <li *ngFor="let n of userNames; let i = index;">
        <button (click)="removeUserNameByIndex(i)">X</button> {{n}} 
      </li>
    </ol>
  `,
})
export class AppComponent {
  userNames: string[] = ["Sheraz", "Tariq", "Chaudhry"];

  addUserName(userName:string): boolean {
    this.userNames.push(userName);
    // returning false so that submit whole page will not submit
    return false;
  }

  removeUserNameByIndex(indexNumber: number): void {
    this.userNames.splice(indexNumber, 1);
  }
}
