import { EmployeePersonalEffects } from "./employee-personal.effect";
import { EmployeeEmploymentEffects } from "./employee-employment.effect";
import { EmployeeContactEffects } from "./employee-contact.effect";
import { EmployeeGovernmentEffects } from "./employee-government.effect";
import { EmployeeHealthEffects } from "./employee-health.effect";
import { EmployeeCompensationEffect } from "./employee-compensation.effect";

export const effects: any[] = [
  EmployeePersonalEffects,
  EmployeeEmploymentEffects,
  EmployeeContactEffects,
  EmployeeGovernmentEffects,
  EmployeeHealthEffects,
  EmployeeCompensationEffect
];

export * from "./employee-personal.effect";
export * from "./employee-employment.effect";
export * from "./employee-contact.effect";
export * from "./employee-government.effect";
export * from "./employee-health.effect";
export * from "./employee-compensation.effect";
