import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { ContractTypeFormComponent } from "./../components/contract-type-form/contract-type-form.component";

import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import {
  ContractType,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class ContractTypeService {
  private dialogRef;
  private url: string = "/contract/types";
  constructor(
    private httpHelper: HttpHelperService,
    private dialog: MatDialog
  ) {}
  getContractType(
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
    return this.httpHelper.httpPost<CreateResponse>(this.url, data);
  }

  updateContractType(data: ContractType) {
    const url = `${this.url}/${data.contractTypeId}`;
    return this.httpHelper.httpPut<UpdateResponse>(url, data).pipe(
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
