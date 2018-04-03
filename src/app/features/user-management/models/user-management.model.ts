export interface UserManagementModel {
  userId: number;
  username: string;
  role: number;
  profileName: string;
  projectId: number;
  userManagementTableHash?: number;
}

export interface UserManagentDataResponse {
  status: number;
  data: UserManagementModel[];
  count: number;
}

export interface UserManagemetResponse {
  status: number;
  message: string;
}

export interface UserMangementResetPassword {
  userId: number;
  username: string;
}

export interface UserManagementChangeStatus {
  userId: number;
  status: number;
}
