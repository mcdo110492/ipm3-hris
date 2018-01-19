import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeClubFormComponent } from "./../components/employee-club/employee-club-form/employee-club-form.component";

import { environment } from "@env/environment";

import { map } from "rxjs/operators";

import { EmployeeClub } from "./../models/employee-club.model";
import { MomentService } from "@core/services/moment.service";
import { Observable } from "rxjs/Observable";

interface DataResponse {
  status: number;
  data: EmployeeClub[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeClub;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeClub;
}

@Injectable()
export class EmployeeClubService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(
    private http: HttpClient,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadClub(employeeId: number) {
    return this.http
      .get<DataResponse>(`${this.restEndPoint}/employee/club/${employeeId}`)
      .pipe(
        map(result => {
          const { data } = result;
          const newData = data.map(data => {
            data.clubTableHash = Date.now() + data.employeeClubId;
            return data;
          });
          return { ...result, data: newData };
        })
      );
  }

  saveClub(data: EmployeeClub, employeeId: number) {
    const params = {
      ...data,
      membershipDate: this.moment.parseDateToMoment(data.membershipDate)
    };

    return this.http
      .post(`${this.restEndPoint}/employee/club/${employeeId}`, params)
      .pipe(
        map((result: CreateResponse) => {
          const { createdData } = result;
          const clubTableHash = Date.now() + createdData.employeeClubId;
          const data = { ...createdData, clubTableHash };
          return { ...result, createdData: data };
        })
      );
  }

  updateClub(data: EmployeeClub) {
    const params = {
      ...data,
      membershipDate: this.moment.parseDateToMoment(data.membershipDate)
    };

    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/club/${data.employeeClubId}`,
        params
      )
      .pipe(
        map(result => {
          const { updatedData } = result;
          const { clubTableHash } = data;
          const newData = { ...updatedData, clubTableHash };
          return { ...result, updatedData: newData };
        })
      );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeClubFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
