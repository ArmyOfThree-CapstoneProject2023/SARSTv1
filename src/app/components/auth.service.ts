import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

//imports data model for createuser function
import { AuthData } from "./auth-data.model";

//imports data model for login function
import { AuthDataLogin } from "./auth-dataLogin.model";

@Injectable({ providedIn: 'root' })
export class AuthService {


  constructor(private http: HttpClient){}

  //createUser sends collected data to the database
  createUser(email: string, password: string, username: string, accountType: string) {
    const authData: AuthData = {email: email, password: password, username: username, accountType: accountType};
    this.http.post("http://localhost:3000/api/user/register", authData).subscribe(response => {
      console.log(response);
    });
  }

  //login sends a request to database to check users submitted info
  login(email: string, password: string) {
    const authDataLogin: AuthDataLogin = {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/login", authDataLogin).subscribe(response => {
      console.log(response);
    });
  }

}
