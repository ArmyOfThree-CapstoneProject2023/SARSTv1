import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';


import { AuthService } from '../auth.service';

interface AccountType{
  accountType: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  

})
export class SignupComponent{
  isLoading = false;
  defaultQuestion = "Options";
  accountTypes: AccountType[] = [
      {accountType: 'root', viewValue: 'Root'},
      {accountType: 'admin', viewValue: 'Admin'},
      {accountType: 'serviceProvider', viewValue: 'Service Provider'}
    ];

  constructor(public authService: AuthService){}

  onRegister(form: NgForm){

    if(form.invalid){
      return;
    }

    this.authService.createUser(form.value.email, form.value.password, form.value.username, form.value.accountType);
  }

}
