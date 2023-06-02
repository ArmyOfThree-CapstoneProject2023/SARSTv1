import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FacilityComponent } from './components/facility/facility.component';
import { ListResidentComponent } from './components/resident/list-resident/list-resident.component';
import { CreateResidentComponent } from './components/resident/create-resident/create-resident.component';
import { AuthGuard } from './components/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component:SignupComponent },
  { path: 'facility', component:FacilityComponent, canActivate: [AuthGuard] },
  { path: '', component:ListResidentComponent, canActivate: [AuthGuard] },
  { path: 'createResident', component:CreateResidentComponent, canActivate: [AuthGuard] },
  //this route connects to the same component as another component but is used for editing residents
  //the /:residentId will allow us to extract the residentId
  { path: 'edit/:residentId', component:CreateResidentComponent, canActivate: [AuthGuard] }
];
//The canActivate: [AuthGuard] are protects the routes from unwanted access. Redirects unauthenticated users to the login page
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
