import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//importing ActivatedRoute
import { ActivatedRoute, ParamMap
 } from '@angular/router';

import { Resident } from '../resident.model';
import { ResidentsService } from '../residents.service';

@Component({
  selector: 'app-create-resident',
  templateUrl: './create-resident.component.html',
  styleUrls: ['./create-resident.component.css']
})
export class CreateResidentComponent implements OnInit {
  enteredName = "";
  enteredContent = "";
  resident!: Resident;
  isLoading = false;
  private mode = "create";
  private residentId: string;

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
          this.resident = {id: residentData._id, name: residentData.name, content: residentData.content};
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
      this.residentsService.addResident(form.value.name, form.value.content);
    } else {
      this.residentsService.updateResident(this.residentId,
        form.value.name,
        form.value.content)
    }
    form.resetForm();
  }
}
