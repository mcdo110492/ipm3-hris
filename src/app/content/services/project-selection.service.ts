import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ProjectResponse } from "@content/models/project-response.model";

import { environment } from "@env/environment";

@Injectable()
export class ProjectSelectionService {
  restEndPoint: string = environment.restEndPoint;

  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get<ProjectResponse>(`${this.restEndPoint}/projects/all`);
  }
}
