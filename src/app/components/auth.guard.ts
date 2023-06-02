import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./auth.service";

//To inject services into anoter service you must use the @Injectable()
//Use the @Injectable to inject auth.services.ts into auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']); //If user is not authenticated then redirect to login page
    }
    return isAuth;
  }
}
