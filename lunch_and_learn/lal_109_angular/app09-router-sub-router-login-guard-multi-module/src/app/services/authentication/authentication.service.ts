import {Injectable} from '@angular/core';
import {SessionUser} from '../modal/session-user';

@Injectable()
export class AuthenticationService {

  private loggedInUser: SessionUser;

  constructor() {}

  login(userId: string, password: string): SessionUser {
    if (userId === 'abrar' && password === 'abrar') {
      this.loggedInUser = {
        firstName: 'Abrar',
        lastName: 'Tariq',
        roles: ['manager']
      };
    } else if (userId === 'sheraz' && password === 'sheraz') {
      this.loggedInUser = {
        firstName: 'Sheraz',
        lastName: 'Chaudhry',
        roles: ['manager', 'admin']
      };
    } else {
      this.loggedInUser = undefined;
    }
    return this.loggedInUser;
  }

  logout() {
    this.loggedInUser = undefined;
  }

  currentUser(): SessionUser {
    return this.loggedInUser;
  }

  isCurrentUserAdmin(): boolean {
    return this.currentUser() && this.currentUser().roles
      && this.currentUser().roles.includes('admin');
  }

  isCurrentUserManager(): boolean {
    return this.currentUser() && this.currentUser().roles
      && (
        this.currentUser().roles.includes('admin')
        || this.currentUser().roles.includes('manager')
      );
  }
}
