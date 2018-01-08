import { Project } from "./project.model";

export interface DataResponse {
  status: number;
  count: number;
  data: Project[];
}

export interface CreateResponse {
  status: number;
  message: string;
  createdData: Project;
}

export interface UpdateResponse {
  status: number;
  message: string;
  updatedData: Project;
}
