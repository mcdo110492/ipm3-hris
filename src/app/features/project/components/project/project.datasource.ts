import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Project } from "./../../models/project.model";

export class ProjectTableDataSource extends DataSource<Project> {
  constructor(private collections$: Observable<Project[]>) {
    super();
  }

  connect(): Observable<Project[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
