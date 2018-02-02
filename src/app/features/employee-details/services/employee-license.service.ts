import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeLicenseFormComponent } from "./../components/employee-license/employee-license-form/employee-license-form.component";

import { environment } from "@env/environment";

import { map } from "rxjs/operators";

import { EmployeeLicense } from "./../models/employee-license.model";
import { MomentService } from "@core/services/moment.service";
import { Observable } from "rxjs/Observable";

interface DataResponse {
  status: number;
  data: EmployeeLicense[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeLicense;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeLicense;
}

@Injectable()
export class EmployeeLicenseService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(
    private http: HttpClient,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadLicense(employeeId: number) {
    return this.http
      .get<DataResponse>(`${this.restEndPoint}/employee/license/${employeeId}`)
      .pipe(
        map(result => {
          const { data } = result;
          const newData = data.map(data => {
            data.licenseTableHash = Date.now() + data.employeeLicenseId;
            return data;
          });
          return { ...result, data: newData };
        })
      );
  }

  saveLicense(data: EmployeeLicense, employeeId: number) {
    const params = {
      ...data,
      dateIssued: this.moment.parseDateToMoment(data.dateIssued),
      dateExpiry: this.moment.parseDateToMoment(data.dateExpiry)
    };

    return this.http
      .post(`${this.restEndPoint}/employee/license/${employeeId}`, params)
      .pipe(
        map((result: CreateResponse) => {
          const { createdData } = result;
          const licenseTableHash = Date.now() + createdData.employeeLicenseId;
          const data = { ...createdData, licenseTableHash };
          return { ...result, createdData: data };
        })
      );
  }

  updateLicense(data: EmployeeLicense) {
    const params = {
      ...data,
      dateIssued: this.moment.parseDateToMoment(data.dateIssued),
      dateExpiry: this.moment.parseDateToMoment(data.dateExpiry)
    };

    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/license/${data.employeeLicenseId}`,
        params
      )
      .pipe(
        map(result => {
          const { updatedData } = result;
          const { licenseTableHash } = data;

          const newData = {
            ...updatedData,
            licenseTableHash
          };
          return { ...result, updatedData: newData };
        })
      );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeLicenseFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
