import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { UserManagementModel } from "./../../models/user-management.model";

export class UserManagementTableDataSource extends DataSource<
  UserManagementModel
> {
  constructor(private collections$: Observable<UserManagementModel[]>) {
    super();
  }

  connect(): Observable<UserManagementModel[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
