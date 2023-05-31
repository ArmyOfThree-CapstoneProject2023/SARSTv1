import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//importing ActivatedRoute
import { ActivatedRoute, ParamMap
 } from '@angular/router';

import { Resident } from '../resident.model';
import { ResidentsService } from '../residents.service';
import { Rgender } from '../resident-gender.model';
import { Rsex } from '../resident-sex.model';
import { Rpronouns } from '../resident-pronouns.model';
import { DisAction } from '../resident-disciplinaryactions.model';


@Component({
  selector: 'app-create-resident',
  templateUrl: './create-resident.component.html',
  styleUrls: ['./create-resident.component.css']
})
export class CreateResidentComponent implements OnInit {
  enteredFName = "";
  enteredLName = "";
  enteredContent = "";


  resident: Resident;
  isLoading = false;
  private mode = "create";
  private residentId: string;

  rsexes: Rsex[] = [
    {rsexValue: 'Male', viewValue: 'Male' },
    {rsexValue: 'Female', viewValue: 'Female'},
    {rsexValue: 'Intersex', viewValue: 'Intersex'},
  ];

  rgenders: Rgender[] = [
    {rgenderValue: 'Male', viewValue: 'Male'},
    {rgenderValue: 'Female', viewValue: 'Female'},
    {rgenderValue: 'Transgender', viewValue: 'Transgender'},
    {rgenderValue: 'NonBinary', viewValue: 'Non-Binary'},
    {rgenderValue: 'GenderFluid', viewValue: 'Gender Fluid'},
    {rgenderValue: 'Other', viewValue: 'Other'},
  ];

  pronouns: Rpronouns[] = [
    {rpronounValue: 'HeHimHis', viewValue: 'He/Him/His'},
    {rpronounValue: 'SheHerHers',viewValue:'She/Her/Hers'},
    {rpronounValue: 'TheyThem',viewValue:'They/Them'},
  ];

  disActions: DisAction[] = [
    {disActionValue: 'Warning', viewValue: 'Warning'},
    {disActionValue: 'Education', viewValue: 'Education'},
    {disActionValue: 'LastChance', viewValue: 'Last Chance Contract'},
    {disActionValue: 'StepAway', viewValue: 'StepAway'},
  ];

  //constructor is binding route and injecting ActivatedRoute
  //ActivatedRoute holds important data about the route being used
  constructor(public residentsService: ResidentsService,
    public route: ActivatedRoute) {}

  //ngOnInit is being used to see if we have a residentId as a parameter for the route
  //paramMap is a built-in observable in which nevers needs to unsubscribe
  //this observable listens to routes in the URL and makes updates to the UI
  ngOnInit() {
     this.route.paramMap.subscribe
    ((paramMap: ParamMap) => {
      //paramMap.has("residentId") is used check for a residentId parameter if no parameter then Angular knows its in createResident route
      if (paramMap.has("residentId")) {
        this.mode = "edit";
        this.residentId = paramMap.get("residentId");
        this.isLoading = true;
        this.residentsService.getResident(this.residentId).subscribe(residentData => {
          this.isLoading = false;
          this.resident = {id: residentData._id, rfname: residentData.rfname, rlname: residentData.rlname, rdob: residentData.rdob, rsex: residentData.rsex, rgender: residentData.rgender, rpronouns: residentData.rpronouns, content: residentData.content, disAction: residentData.disAction};
        });
      } else {
        this.mode = "create";
        this.residentId = null;
      }
    });
  }

  onSaveRes(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.residentsService.addResident(form.value.rfname, form.value.rlname, form.value.dob, form.value.rsex, form.value.rgender, form.value.rpronouns, form.value.content, form.value.disAction);
    } else {
      this.residentsService.updateResident(this.residentId,
        form.value.rfname, form.value.rlname, form.value.rdob, form.value.rsex, form.value.rgender, form.value.rpronouns, form.value.content, form.value.disAction)
    }
    form.resetForm();
  }
}
