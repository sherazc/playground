import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Edit User</h1>
    <p>
      Name: {{name.firstName}} {{name.lastName}}
    </p>
    <p>
      Email: {{email}}
    </p>
    <hr/>
    <form>
      <label>First Name:</label>
      <input name="name.firstName" [(ngModel)]="name.firstName" />
      <br/>
      <label>Last Name:</label>
      <input name="name.last" [(ngModel)]="name.lastName" />
      <br/>
      <label>Email:</label>
      <input name="email" [(ngModel)]="email" />
    </form>
  `,
})
export class AppComponent {
  name: NameType = {
    firstName: "Sheraz",
    lastName: "Chaudhry"
  };
  email: string = "sheraz@site.com"
}

interface NameType {
  firstName: string;
  lastName: string;
}
