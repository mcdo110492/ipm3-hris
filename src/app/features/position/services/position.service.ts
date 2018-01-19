import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { PositionFormComponent } from "./../components/position-form/position-form.component";

import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import {
  Position,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class PositionService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  getPosition(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string,
    searchQuery: string
  ) {
    const page = (pageIndex + 1).toString();
    const params = new HttpParams()
      .set("filter", searchQuery)
      .append("field", sortField)
      .append("order", sortDirection)
      .append("limit", pageSize.toString())
      .append("page", page);

    return this.http
      .get<DataResponse>(`${this.restEndPoint}/positions`, {
        params
      })
      .pipe(
        map(result => {
          const { data, count } = result;
          const newData = data.map(data => {
            data.positionTableHash = Date.now() + data.positionId;
            return data;
          });
          return {
            ...result,
            data: newData
          };
        })
      );
  }

  createPosition(position: Position) {
    return this.http.post<CreateResponse>(
      `${this.restEndPoint}/positions`,
      position
    );
  }

  updatePosition(position: Position) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/positions/${position.positionId}`,
        position
      )
      .pipe(
        map(result => {
          const { updatedData } = result;
          const newData = {
            ...updatedData,
            positionTableHash: position.positionTableHash
          };
          return {
            ...result,
            updatedData: newData
          };
        })
      );
  }

  openForm() {
    this.dialogRef = this.dialog.open(PositionFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
