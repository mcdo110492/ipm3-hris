import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeLicenseFormComponent } from "./../components/employee-license/employee-license-form/employee-license-form.component";

import { HttpHelperService } from "@helper/services/http-helper.service";

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
  private dialogRef;
  private url: string = "/employee/license";
  constructor(
    private httpHelper: HttpHelperService,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadLicense(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
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
    const url = `${this.url}/${employeeId}`;
    const body = {
      ...data,
      dateIssued: this.moment.parseDateToMoment(data.dateIssued),
      dateExpiry: this.moment.parseDateToMoment(data.dateExpiry)
    };
    return this.httpHelper.httpPost<CreateResponse>(url, body).pipe(
      map((result: CreateResponse) => {
        const { createdData } = result;
        const licenseTableHash = Date.now() + createdData.employeeLicenseId;
        const data = { ...createdData, licenseTableHash };
        return { ...result, createdData: data };
      })
    );
  }

  updateLicense(data: EmployeeLicense) {
    const url = `${this.url}/${data.employeeLicenseId}`;
    const body = {
      ...data,
      dateIssued: this.moment.parseDateToMoment(data.dateIssued),
      dateExpiry: this.moment.parseDateToMoment(data.dateExpiry)
    };

    return this.httpHelper.httpPut<UpdateResponse>(url, body).pipe(
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
