import { Project } from "@features/project/models/project.model";

export interface ProjectResponse {
  status: number;
  data: Project[];
}
