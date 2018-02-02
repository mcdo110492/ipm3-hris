import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeClubFormComponent } from "./../components/employee-club/employee-club-form/employee-club-form.component";

import { HttpHelperService } from "@helper/services/http-helper.service";

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
  private dialogRef;
  private url: string = "/employee/club";
  constructor(
    private httpHelper: HttpHelperService,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadClub(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
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
    const url = `${this.url}/${employeeId}`;
    const body = {
      ...data,
      membershipDate: this.moment.parseDateToMoment(data.membershipDate)
    };

    return this.httpHelper.httpPost<CreateResponse>(url, body).pipe(
      map((result: CreateResponse) => {
        const { createdData } = result;
        const clubTableHash = Date.now() + createdData.employeeClubId;
        const data = { ...createdData, clubTableHash };
        return { ...result, createdData: data };
      })
    );
  }

  updateClub(data: EmployeeClub) {
    const url = `${this.url}/${data.employeeClubId}`;
    const body = {
      ...data,
      membershipDate: this.moment.parseDateToMoment(data.membershipDate)
    };
    return this.httpHelper.httpPut<UpdateResponse>(url, body).pipe(
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
