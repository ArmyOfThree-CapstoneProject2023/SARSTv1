//This auth-interceptor is used to intercept all outgoing request and adds authHeader
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken(); //gets the token from auth-service file
    const authRequest = req.clone({ //used to make a copy of request and prevent prblems
      headers: req.headers.set("Authorization", "Bearer " + authToken) //getting 'authorization' token from the middleware/check-auth.js file
    });
    return next.handle(authRequest);
  }
}
