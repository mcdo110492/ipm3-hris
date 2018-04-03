import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserManagementListComponent } from "./components/user-management-list/user-management-list.component";

const routes: Routes = [{ path: "", component: UserManagementListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
