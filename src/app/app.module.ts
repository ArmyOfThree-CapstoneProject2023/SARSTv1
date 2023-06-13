import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgFor } from '@angular/common';


import { AngularMaterialComponent } from './angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { FacilityComponent } from './components/facility/facility.component';
import { CreateResidentComponent } from './components/resident/create-resident/create-resident.component';
import { ListResidentComponent } from './components/resident/list-resident/list-resident.component';
import { AuthInterceptor } from './components/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    AppComponent, HeaderComponent, LoginComponent, SignupComponent, FooterComponent, FacilityComponent, CreateResidentComponent, ListResidentComponent, ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DatePipe,
    NgFor,
    AngularMaterialComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent] //informs angular that component will be used when angular is unaware
})
export class AppModule { }
