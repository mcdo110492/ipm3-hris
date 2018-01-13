import { EmployeeDetailsService } from "./employee-details.service";
import { EmployeePersonalService } from "./employee-personal.service";
import { EmployeeEmploymentService } from "./employee-employment.service";
import { EmployeeContactService } from "./employee-contact.service";
import { EmployeeGovernmentService } from "./employee-government.service";
import { EmployeeHealthService } from "./employee-health.service";
import { EmployeeCompensationService } from "./employee-compensation.service";

export const services: any[] = [
  EmployeeDetailsService,
  EmployeePersonalService,
  EmployeeEmploymentService,
  EmployeeContactService,
  EmployeeGovernmentService,
  EmployeeHealthService,
  EmployeeCompensationService
];

export * from "./employee-details.service";
export * from "./employee-personal.service";
export * from "./employee-employment.service";
export * from "./employee-contact.service";
export * from "./employee-government.service";
export * from "./employee-health.service";
export * from "./employee-compensation.service";
