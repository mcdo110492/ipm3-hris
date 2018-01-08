export interface Project {
  projectId: number;
  projectCode: string;
  projectName: string;
  created_at?: Date;
  updated_at?: Date;
  projectTableHash?: any;
}
