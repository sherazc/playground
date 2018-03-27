import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {NgForm} from '@angular/forms';
import {SessionUser} from "../../services/modal/session-user";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: Router) {}

  ngOnInit() {}

  login(loginForm: NgForm) {
    const sessionUser: SessionUser = this.authenticationService.login(loginForm.value.userId, loginForm.value.password);
    if (sessionUser) {
      this.route.navigate('/view-items');
    } else {

    }
    // loginForm.values;
  }
}
