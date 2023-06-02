import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Resident } from '../resident.model';
import { ResidentsService } from '../residents.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-list-resident',
  templateUrl: './list-resident.component.html',
  styleUrls: ['./list-resident.component.css']
})
export class ListResidentComponent implements OnInit, OnDestroy {
  residents: Resident[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  private residentsSub: Subscription;
  private authStatusSub : Subscription;
  constructor(public residentsService: ResidentsService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.residentsService.getResidents();
    //continuously listen for updates to the list
    this.residentsSub = this.residentsService.getResidentUpdateListener().subscribe((residents: Resident[]) => {
        this.isLoading = false;
        this.residents = residents;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(residentId: string) {
    this.residentsService.deleteResident(residentId);
  }

  //used to prevent memory leaks also stops subscribe when components about to be removed
  ngOnDestroy() {
    this.residentsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
