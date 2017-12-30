import { Project } from "./project.model";

export interface DataResponse {
  status: number;
  count: number;
  data: Project[];
}

export interface StatusResponse {
  status: number;
  message: string;
  createdData?: Project;
}
