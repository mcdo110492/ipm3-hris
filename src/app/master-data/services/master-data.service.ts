import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";

import {
  ProjectResponse,
  PositionResponse,
  EmployeeStatusResponse,
  EmploymentStatusResponse,
  ContractTypeResponse
} from "./../models";

import { Observable } from "rxjs/Observable";

@Injectable()
export class MasterDataService {
  private restEndPoint: string = environment.restEndPoint;
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.restEndPoint}/projects/all`);
  }

  getAllPositions(): Observable<PositionResponse> {
    return this.http.get<PositionResponse>(
      `${this.restEndPoint}/positions/all`
    );
  }

  getAllEmploymentStatus(): Observable<EmploymentStatusResponse> {
    return this.http.get<EmploymentStatusResponse>(
      `${this.restEndPoint}/employment/status/all`
    );
  }

  getAllEmployeeStatus(): Observable<EmployeeStatusResponse> {
    return this.http.get<EmployeeStatusResponse>(
      `${this.restEndPoint}/employee/status/all`
    );
  }

  getAllContractType(): Observable<ContractTypeResponse> {
    return this.http.get<ContractTypeResponse>(
      `${this.restEndPoint}/contract/types/all`
    );
  }
}
