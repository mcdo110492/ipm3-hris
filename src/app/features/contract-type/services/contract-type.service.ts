import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material/dialog";
import { ContractTypeFormComponent } from "./../components/contract-type-form/contract-type-form.component";

import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import {
  ContractType,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class ContractTypeService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  getContractType(
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
      .get<DataResponse>(`${this.restEndPoint}/contract/types`, {
        params
      })
      .pipe(
        map(result => {
          const { data } = result;
          const newData = data.map(data => {
            data.contractTypeTableHash = Date.now() + data.contractTypeId;
            return data;
          });
          return {
            ...result,
            data: newData
          };
        })
      );
  }

  createContractType(data: ContractType) {
    return this.http.post<CreateResponse>(
      `${this.restEndPoint}/contract/types`,
      data
    );
  }

  updateContractType(data: ContractType) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/contract/types/${data.contractTypeId}`,
        data
      )
      .pipe(
        map(result => {
          const { updatedData } = result;
          const newData = {
            ...updatedData,
            contractTypeTableHash: data.contractTypeTableHash
          };
          return {
            ...result,
            updatedData: newData
          };
        })
      );
  }

  openForm() {
    this.dialogRef = this.dialog.open(ContractTypeFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
