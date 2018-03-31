import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {SessionUser} from '../../services/modal/session-user';

@Component({
  selector: 'public-menu',
  templateUrl: './public-menu.component.html',
  styleUrls: ['./public-menu.component.css']
})
export class PublicMenuComponent {

  constructor(private authenticationService: AuthenticationService) { }

  currentUser(): SessionUser  {
    return this.authenticationService.currentUser();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
