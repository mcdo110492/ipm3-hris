import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "@env/environment";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpHelperService {
  private restEndPoint: string = environment.restEndPoint;

  constructor(private http: HttpClient) {}

  httpTableGet<T>(
    url: string,
    params: {
      filter: string;
      field: string;
      order: string;
      limit: string;
      page: string;
      project?: string;
    }
  ) {
    const httpParams = new HttpParams()
      .set("filter", params.filter)
      .append("field", params.field)
      .append("order", params.order)
      .append("limit", params.limit)
      .append("page", params.page)
      .append("projectId", params.project);

    return this.http.get<T>(`${this.restEndPoint}${url}`, {
      params: httpParams
    });
  }

  httpGet<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.restEndPoint}${url}`, { params });
  }

  httpPost<T>(url: string, body: any | null): Observable<T> {
    return this.http.post<T>(`${this.restEndPoint}${url}`, body);
  }

  httpPut<T>(url: string, body: any | null): Observable<T> {
    return this.http.put<T>(`${this.restEndPoint}${url}`, body);
  }
}
