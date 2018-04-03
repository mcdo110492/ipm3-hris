export interface ProfileSettingsModel {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileSettingsResponse {
  status: number;
  message: string;
}
