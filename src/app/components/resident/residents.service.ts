import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router"

import { Resident } from "./resident.model";
//service is accessible throughout the whole application
@Injectable({providedIn: 'root'})
export class ResidentsService {
  private residents: Resident[] = [];
  private residentsUpdated = new Subject<Resident[]>();

  constructor(private http: HttpClient, private router: Router){}

  getResidents() {
    this.http
      .get<{ message: string; residents: any }>("http://localhost:3000/api/resident")
      .pipe(
        map(residentData => {
          return residentData.residents. map(resident => {
            return {
                rfname: resident.rfname,
                rlname: resident.rlname,
                rdob: resident.rdob,
                rsex: resident.rsex,
                rgender: resident.rgender,
                rpronouns: resident.rpronouns,
                content: resident.content,
                disAction: resident.disAction,
                id: resident._id
              };
            });
          })
      )
      .subscribe(transformedResidents => {
        this.residents = transformedResidents;
        this.residentsUpdated.next([...this.residents]);
      });
  }
  getResidentUpdateListener() {
    return this.residentsUpdated.asObservable();
  }

  //used to fetch a single resident from the backend server by id
  getResident(id: string) {
    return this.http.get<{ _id: string;
    rfname: string; rlname: string; rdob: string; rsex:string; rgender:string; rpronouns:string; content: string; disAction: string;}>(
      "http://localhost:3000/api/resident/" + id
    );
  }

  addResident(rlname: string, rfname: string, rdob: string, rsex: string, rgender: string, rpronouns: string, content: string, disAction: string)
  {
    const resident: Resident = { id: null, rfname: rfname, rlname: rlname, rdob: rdob, rsex: rsex, rgender:rgender, rpronouns: rpronouns, content: content, disAction: disAction };
    this.http
      .post<{ message: string; residentId: string }>(
        "http://localhost:3000/api/resident", resident
      )
      .subscribe(responseData => {
        const id = responseData.residentId;
        resident.id = id;
        this.residents.push(resident);
        this.residentsUpdated.next([...this.residents]);
        this.router.navigate(["/"]);
      });
  }

  updateResident(id: string, rfname: string, rlname: string, rdob: string, rsex: string, rgender: string, rpronouns: string, content: string, disAction: string) {
    //creates a new resident and takes id, name, & content as arguments
    const resident: Resident = { id: id, rfname: rfname, rlname:rlname, rdob: rdob, rsex: rsex, rgender: rgender, rpronouns: rpronouns, content: content, disAction: disAction };
    this.http
      .put("http://localhost:3000/api/resident/" + id, resident)
      .subscribe(response => {
        const updatedResidents = [...this.residents];
        const oldResidentIndex = updatedResidents.findIndex(p => p.id === resident.id );
        updatedResidents[oldResidentIndex] = resident;
        this.residents = updatedResidents;
        this.residentsUpdated.next([...this.residents]);
        this.router.navigate(["/"]);
      });
  }

  deleteResident(residentId: string) {
    this.http
      .delete("http://localhost:3000/api/resident/" + residentId)
      .subscribe(() => {
        const updatedResidents = this.residents.filter(resident => resident.id !== residentId);
        this.residents = updatedResidents;
        this.residentsUpdated.next([...this.residents]);
      });
  }
}
