import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { PositionFormComponent } from "./../components/position-form/position-form.component";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import {
  Position,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class PositionService {
  private dialogRef;
  private url: string = "/positions";
  constructor(
    private dialog: MatDialog,
    private httpHelper: HttpHelperService
  ) {}
  getPosition(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortDirection: string,
    searchQuery: string
  ) {
    const page = (pageIndex + 1).toString();

    const params = {
      filter: searchQuery,
      field: sortField,
      order: sortDirection,
      limit: pageSize.toString(),
      page
    };

    return this.httpHelper.httpTableGet<DataResponse>(this.url, params).pipe(
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
    return this.httpHelper.httpPost<CreateResponse>(this.url, position);
  }

  updatePosition(position: Position) {
    const url = `${this.url}/${position.positionId}`;
    return this.httpHelper.httpPut<UpdateResponse>(url, position).pipe(
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
