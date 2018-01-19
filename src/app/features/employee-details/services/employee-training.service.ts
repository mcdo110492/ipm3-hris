import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { EmployeeTrainingFormComponent } from "./../components/employee-training/employee-training-form/employee-training-form.component";

import { environment } from "@env/environment";

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
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(
    private http: HttpClient,
    private moment: MomentService,
    private dialog: MatDialog
  ) {}

  loadTraining(employeeId: number) {
    return this.http
      .get<DataResponse>(`${this.restEndPoint}/employee/training/${employeeId}`)
      .pipe(
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
    const params = {
      ...data,
      trainingFrom: this.moment.parseDateToMoment(data.trainingFrom),
      trainingTo: this.moment.parseDateToMoment(data.trainingTo)
    };

    return this.http
      .post(`${this.restEndPoint}/employee/training/${employeeId}`, params)
      .pipe(
        map((result: CreateResponse) => {
          const { createdData } = result;
          const trainingTableHash = Date.now() + createdData.employeeTrainingId;
          const data = { ...createdData, trainingTableHash };
          return { ...result, createdData: data };
        })
      );
  }

  updateTraining(data: EmployeeTraining) {
    const params = {
      ...data,
      trainingFrom: this.moment.parseDateToMoment(data.trainingFrom),
      trainingTo: this.moment.parseDateToMoment(data.trainingTo)
    };

    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/employee/training/${data.employeeTrainingId}`,
        params
      )
      .pipe(
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
