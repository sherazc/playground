import {Component} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {NgForm} from '@angular/forms';
import {SessionUser} from '../../services/modal/session-user';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFailed: boolean;

  constructor(private authenticationService: AuthenticationService, private route: Router) {}

  login(loginForm: NgForm) {
    this.loginFailed = false;
    const sessionUser: SessionUser = this.authenticationService.login(loginForm.value.userId, loginForm.value.password);
    if (sessionUser) {
      this.route.navigate(['/view-items']);
    } else {
      this.loginFailed = true;
    }
  }
}
