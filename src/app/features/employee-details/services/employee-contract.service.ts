import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeContractFormComponent } from "./../components/employee-contract/employee-contract-form/employee-contract-form.component";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { map } from "rxjs/operators";

import { EmployeeContract } from "./../models/employee-contract.model";
import { MomentService } from "@core/services/moment.service";
import { Observable } from "rxjs/Observable";

interface DataResponse {
  status: number;
  data: EmployeeContract[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeContract;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeContract;
}

@Injectable()
export class EmployeeContractService {
  private dialogRef;
  private url: string = "/employee/contract/history";
  constructor(
    private httpHelper: HttpHelperService,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadContract(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.contractTableHash = Date.now() + data.employeeContractId;
          return data;
        });
        return { ...result, data: newData };
      })
    );
  }

  saveContract(data: EmployeeContract, employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    const body = {
      ...data,
      contractStart: this.moment.parseDateToMoment(data.contractStart),
      contractEnd: this.moment.parseDateToMoment(data.contractEnd),
      contractExtension: this.moment.parseDateToMoment(data.contractExtension)
    };
    return this.httpHelper.httpPost<CreateResponse>(url, body).pipe(
      map((result: CreateResponse) => {
        const { createdData } = result;
        const contractTableHash = Date.now() + createdData.contractTypeId;
        const data = { ...createdData, contractTableHash };
        return { ...result, createdData: data };
      })
    );
  }

  updateContract(data: EmployeeContract) {
    const url = `${this.url}/${data.contractTypeId}`;
    const body = {
      ...data,
      contractStart: this.moment.parseDateToMoment(data.contractStart),
      contractEnd: this.moment.parseDateToMoment(data.contractEnd),
      contractExtension: this.moment.parseDateToMoment(data.contractExtension)
    };

    return this.httpHelper.httpPut<UpdateResponse>(url, body).pipe(
      map(result => {
        const { updatedData } = result;
        const { contractTableHash } = data;
        const newData = { ...updatedData, contractTableHash };
        return { ...result, updatedData: newData };
      })
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeContractFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
