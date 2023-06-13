import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


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
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  defaultQuestion = "Options";
  accountTypes: AccountType[] = [
      {accountType: 'root', viewValue: 'Root'},
      {accountType: 'admin', viewValue: 'Admin'},
      {accountType: 'serviceProvider', viewValue: 'Service Provider'}
    ];

  constructor(public authService: AuthService){}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onRegister(form: NgForm){

    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password, form.value.username, form.value.accountType);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
