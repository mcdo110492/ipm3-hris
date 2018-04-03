import { Injectable } from "@angular/core";

import { HttpHelperService } from "@helper/services/http-helper.service";
import {
  ProfileSettingsModel,
  ProfileSettingsResponse
} from "@app/features/profile-settings/models/profile-settings.model";

@Injectable()
export class ProfileSettingsService {
  constructor(private _httpHelper: HttpHelperService) {}

  changePassword(data: ProfileSettingsModel) {
    const url = "/user/profile/changePassword";
    return this._httpHelper.httpPost<ProfileSettingsResponse>(url, data);
  }
}
