import { EmployeeDetailsService } from "./employee-details.service";
import { EmployeePersonalService } from "./employee-personal.service";
import { EmployeeEmploymentService } from "./employee-employment.service";
import { EmployeeContactService } from "./employee-contact.service";
import { EmployeeGovernmentService } from "./employee-government.service";

export const services: any[] = [
  EmployeeDetailsService,
  EmployeePersonalService,
  EmployeeEmploymentService,
  EmployeeContactService,
  EmployeeGovernmentService
];

export * from "./employee-details.service";
export * from "./employee-personal.service";
export * from "./employee-employment.service";
export * from "./employee-contact.service";
export * from "./employee-government.service";
