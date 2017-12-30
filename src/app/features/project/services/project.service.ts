import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { MatDialog } from "@angular/material";

import { environment } from "@env/environment";

import { ProjectFormComponent } from "./../components/project-form/project-form.component";

import { Project, DataResponse, StatusResponse } from "./../models";

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

    return this.http.get<DataResponse>(`${this.restEndPoint}/projects`, {
      params
    });
  }

  createProject(project: Project) {
    return this.http.post<StatusResponse>(
      `${this.restEndPoint}/projects`,
      project
    );
  }

  updateProject(project: Project) {
    return this.http.put<StatusResponse>(
      `${this.restEndPoint}/projects/${project.projectId}`,
      project
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
