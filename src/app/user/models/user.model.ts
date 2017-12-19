export interface User {
  username: string;
  profileName: string;
  userRole: number;
  token: string;
  profileImage: string;
  refreshToken?: string;
}
