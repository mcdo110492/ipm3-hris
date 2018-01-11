import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { EmployeePersonalComponent } from "./employee-personal/employee-personal.component";
import { EmployeeEmploymentComponent } from "./employee-employment/employee-employment.component";
import { EmployeeEducationComponent } from "./employee-education/employee-education.component";
import { EmployeeContactComponent } from "./employee-contact/employee-contact.component";
import { EmployeeGovernmentComponent } from "./employee-government/employee-government.component";

export const components: any[] = [
  EmployeeDetailsComponent,
  EmployeePersonalComponent,
  EmployeeEmploymentComponent,
  EmployeeContactComponent,
  EmployeeEducationComponent,
  EmployeeGovernmentComponent
];

export * from "./employee-details/employee-details.component";
export * from "./employee-personal/employee-personal.component";
export * from "./employee-employment/employee-employment.component";
export * from "./employee-education/employee-education.component";
export * from "./employee-contact/employee-contact.component";
export * from "./employee-government/employee-government.component";
