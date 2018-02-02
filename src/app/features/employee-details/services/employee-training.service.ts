import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeTrainingFormComponent } from "./../components/employee-training/employee-training-form/employee-training-form.component";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { map } from "rxjs/operators";

import { EmployeeTraining } from "./../models/employee-training.model";
import { MomentService } from "@core/services/moment.service";
import { Observable } from "rxjs/Observable";

interface DataResponse {
  status: number;
  data: EmployeeTraining[];
}

interface CreateResponse {
  status: number;
  message: string;
  createdData: EmployeeTraining;
}

interface UpdateResponse {
  status: number;
  message: string;
  updatedData: EmployeeTraining;
}
@Injectable()
export class EmployeeTrainingService {
  private dialogRef;
  private url: string = "/employee/training";
  constructor(
    private httpHelper: HttpHelperService,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadTraining(employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    return this.httpHelper.httpGet<DataResponse>(url).pipe(
      map(result => {
        const { data } = result;
        const newData = data.map(data => {
          data.trainingTableHash = Date.now() + data.employeeTrainingId;
          return data;
        });
        return { ...result, data: newData };
      })
    );
  }

  saveTraining(data: EmployeeTraining, employeeId: number) {
    const url = `${this.url}/${employeeId}`;
    const body = {
      ...data,
      trainingFrom: this.moment.parseDateToMoment(data.trainingFrom),
      trainingTo: this.moment.parseDateToMoment(data.trainingTo)
    };
    return this.httpHelper.httpPost<CreateResponse>(url, body).pipe(
      map((result: CreateResponse) => {
        const { createdData } = result;
        const trainingTableHash = Date.now() + createdData.employeeTrainingId;
        const data = { ...createdData, trainingTableHash };
        return { ...result, createdData: data };
      })
    );
  }

  updateTraining(data: EmployeeTraining) {
    const url = `${this.url}/${data.employeeTrainingId}`;
    const body = {
      ...data,
      trainingFrom: this.moment.parseDateToMoment(data.trainingFrom),
      trainingTo: this.moment.parseDateToMoment(data.trainingTo)
    };

    return this.httpHelper.httpPut<UpdateResponse>(url, body).pipe(
      map(result => {
        const { updatedData } = result;
        const { trainingTableHash } = data;
        const newData = { ...updatedData, trainingTableHash };
        return { ...result, updatedData: newData };
      })
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(EmployeeTrainingFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
