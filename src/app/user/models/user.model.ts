export interface User {
  profileName: string;
  userRole: number;
  token: string;
  profileImage: string;
  refreshToken?: string;
}
