import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";
import { map } from "rxjs/operators";

import { environment } from "@env/environment";

import { ProjectFormComponent } from "./../components/project-form/project-form.component";

import {
  Project,
  DataResponse,
  CreateResponse,
  UpdateResponse
} from "./../models";

@Injectable()
export class ProjectService {
  private restEndPoint: string = environment.restEndPoint;
  private dialogRef;
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  getProject(
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
      .get<DataResponse>(`${this.restEndPoint}/projects`, {
        params
      })
      .pipe(
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
    return this.http.post<CreateResponse>(
      `${this.restEndPoint}/projects`,
      project
    );
  }

  updateProject(project: Project) {
    return this.http
      .put<UpdateResponse>(
        `${this.restEndPoint}/projects/${project.projectId}`,
        project
      )
      .pipe(
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
