import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
//imports data model for createuser function
import { AuthData } from "./auth-data.model";

//imports data model for login function
import { AuthDataLogin } from "./auth-dataLogin.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router){}

  getToken(){ //gets the token
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){  //gets the listener
    return this.authStatusListener.asObservable();
  }

  //createUser sends collected data to the database
  createUser(email: string, password: string, username: string, accountType: string) {
    const authData: AuthData = {email: email, password: password, username: username, accountType: accountType};
    this.http.post("http://localhost:3000/api/user/register", authData).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  //login sends a request to database to check users submitted info
  login(email: string, password: string) {
    const authDataLogin: AuthDataLogin = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/user/login", authDataLogin).subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true); //will inform user is authenticated
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate);
        this.router.navigate(['/']);
      }
    });
  }

  autoAuthUser(){ //will attempt to get token from local storage automatically
    const authInformation = this.getAuthData();
    if (!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString())
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return; //if no token or experationDate is found return nothing
    }
    return {  //if token or experationDate is found return token and check expiration of token
      token: token,
      expirationDate: new Date(expirationDate) //checks if the token is not expired
    }
  }
}
