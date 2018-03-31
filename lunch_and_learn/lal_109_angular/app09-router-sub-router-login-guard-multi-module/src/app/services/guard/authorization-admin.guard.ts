import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class AuthorizationAdminGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private route: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.currentUser().roles && this.authenticationService.currentUser().roles.includes('admin')) {
      return true;
    } else {
      this.route.navigate(['un-authorized']);
      return false;
    }
  }
}
