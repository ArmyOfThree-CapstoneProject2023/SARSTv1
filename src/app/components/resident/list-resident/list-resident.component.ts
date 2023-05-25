import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Resident } from '../resident.model';
import { ResidentsService } from '../residents.service';

@Component({
  selector: 'app-list-resident',
  templateUrl: './list-resident.component.html',
  styleUrls: ['./list-resident.component.css']
})
export class ListResidentComponent implements OnInit, OnDestroy {
  residents: Resident[] = [];
  isLoading = false;
  private residentsSub: Subscription;
  constructor(public residentsService: ResidentsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.residentsService.getResidents();
    //continuously listen for updates to the list
    this.residentsSub = this.residentsService.getResidentUpdateListener().subscribe((residents: Resident[]) => {
        this.isLoading = false;
        this.residents = residents;
    });
  }

  onDelete(residentId: string) {
    this.residentsService.deleteResident(residentId);
  }

  //used to prevent memory leaks also stops subscribe when components about to be removed
  ngOnDestroy() {
    this.residentsSub.unsubscribe();
  }
}
