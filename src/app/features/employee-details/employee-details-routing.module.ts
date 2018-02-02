import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import * as fromComponents from "./components";

const initalTitle = "Employee / Details /";

const routes: Routes = [
  {
    path: "",
    component: fromComponents.EmployeeDetailsComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "personal" },
      {
        path: "personal",
        component: fromComponents.EmployeePersonalComponent,
        data: { title: `${initalTitle} Personal`, label: "personal" }
      },
      {
        path: "employment",
        component: fromComponents.EmployeeEmploymentComponent,
        data: { title: `${initalTitle} Employment`, label: "employment" }
      },
      {
        path: "contact",
        component: fromComponents.EmployeeContactComponent,
        data: { title: `${initalTitle} Contact`, label: "contact" }
      },
      {
        path: "government",
        component: fromComponents.EmployeeGovernmentComponent,
        data: {
          title: `${initalTitle} Government Issued ID's`,
          label: "government"
        }
      },
      {
        path: "compensation",
        component: fromComponents.EmployeeCompensationListComponent,
        data: {
          title: `${initalTitle} Compensation Salary`,
          label: "compensation"
        }
      },
      {
        path: "health",
        component: fromComponents.EmployeeHealthComponent,
        data: {
          title: `${initalTitle} Health`,
          label: "health"
        }
      },
      {
        path: "license",
        component: fromComponents.EmployeeLicenseListComponent,
        data: {
          title: `${initalTitle} License`,
          label: "license"
        }
      },
      {
        path: "educational",
        component: fromComponents.EmployeeEducationComponent,
        data: { title: `${initalTitle} Education`, label: "educational" }
      },
      {
        path: "training",
        component: fromComponents.EmployeeTrainingListComponent,
        data: {
          title: `${initalTitle} Training`,
          label: "training"
        }
      },
      {
        path: "club",
        component: fromComponents.EmployeeClubListComponent,
        data: {
          title: `${initalTitle} Club`,
          label: "club"
        }
      },
      {
        path: "contract/history",
        component: fromComponents.EmployeeContractListComponent,
        data: {
          title: `${initalTitle} Contract History`,
          label: "contract"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailsRoutingModule {}
