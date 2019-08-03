import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "./../services";

@Injectable({ providedIn: "root" })
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // logged in so return redirect acording to role
      switch (currentUser.user.role) {
        case "user":
          this.router.navigate(["/home"]);
          break;
        case "admin":
          this.router.navigate(["/home"]);
          break;
        default:
          this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
          break;
      }
      return false;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
