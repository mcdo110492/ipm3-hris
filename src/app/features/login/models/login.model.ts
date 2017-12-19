export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse {
  profileName: string;
  profileImage: string;
  role: number;
  status: number;
  token: string;
  refreshToken?: string;
}
