import { Project } from "@app/features/project/models";

export interface ProjectResponse {
  status: number;
  data: Project[];
}
