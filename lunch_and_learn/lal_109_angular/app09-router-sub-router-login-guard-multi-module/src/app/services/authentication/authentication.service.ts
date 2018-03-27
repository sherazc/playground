import {Injectable} from '@angular/core';
import {SessionUser} from '../modal/session-user';

@Injectable()
export class AuthenticationService {

  private loggedInUser: SessionUser;

  constructor() {}

  login(userId: string, password: string): SessionUser {
    if (userId === 'admin' && password === 'admin') {
      this.loggedInUser = {firstName: 'Sheraz', lastName: 'Chaudhry'};
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
}
