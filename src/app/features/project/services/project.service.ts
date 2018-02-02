import { Injectable } from "@angular/core";

import { MatDialog } from "@angular/material";
import { map } from "rxjs/operators";

import { HttpHelperService } from "@helper/services/http-helper.service";

import { ProjectFormComponent } from "./../components/project-form/project-form.component";

import {
  Project,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class ProjectService {
  private dialogRef;
  private url: string = "/projects";
  constructor(
    private dialog: MatDialog,
    private httpHelper: HttpHelperService
  ) {}

  getProject(
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
        const newData = data.map(project => {
          project.projectTableHash = Date.now() + project.projectId;
          return project;
        });
        return {
          count,
          data: newData
        };
      })
    );
  }

  createProject(project: Project) {
    return this.httpHelper.httpPost<CreateResponse>(this.url, project);
  }

  updateProject(project: Project) {
    const url = `${this.url}/${project.projectId}`;
    return this.httpHelper.httpPut<UpdateResponse>(url, project).pipe(
      map(result => {
        const { updatedData } = result;
        const newData = {
          ...updatedData,
          projectTableHash: project.projectTableHash
        };
        return {
          ...result,
          updatedData: newData
        };
      })
    );
  }

  openForm() {
    this.dialogRef = this.dialog.open(ProjectFormComponent, {
      width: "auto",
      disableClose: true
    });
  }

  closeForm() {
    this.dialogRef.close();
  }
}
