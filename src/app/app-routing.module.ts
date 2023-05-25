import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { FacilityComponent } from './components/facility/facility.component';
import { ListResidentComponent } from './components/resident/list-resident/list-resident.component';
import { CreateResidentComponent } from './components/resident/create-resident/create-resident.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component:SignupComponent },
  { path: 'facility', component:FacilityComponent },
  { path: '', component:ListResidentComponent },
  { path: 'createResident', component:CreateResidentComponent },
  //this route connects to the same component as another component but is used for editing residents
  //the /:residentId will allow us to extract the residentId
  { path: 'edit/:residentId', component:CreateResidentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
