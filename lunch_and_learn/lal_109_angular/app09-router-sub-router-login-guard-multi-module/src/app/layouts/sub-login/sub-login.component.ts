import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-sub-login',
  templateUrl: './sub-login.component.html',
  styleUrls: ['./sub-login.component.css']
})
export class SubLoginComponent {

  constructor(public authenticationService: AuthenticationService) { }

}
