import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload";
import { environment } from "@env/environment";
import { ToastrService } from "@app/core";

import { Store } from "@ngrx/store";
import * as UserActions from "@user/store/actions/user.action";
import * as fromUser from "@user/store/reducers/user.reducer";
import * as UserSelectors from "@user/store/selectors/user.selector";
import { take } from "rxjs/operators";

@Component({
  selector: "app-change-profile-photo",
  templateUrl: "./change-profile-photo.component.html",
  styleUrls: ["./change-profile-photo.component.scss"]
})
export class ChangeProfilePhotoComponent implements OnInit {
  uploader: FileUploader;
  private _token: string;
  constructor(
    private _toast: ToastrService,
    private _store: Store<fromUser.State>
  ) {}

  ngOnInit() {
    this._store
      .select(UserSelectors.getUserToken)
      .pipe(take(1))
      .subscribe(token => {
        const url = `${
          environment.restEndPoint
        }/user/profile/changeProfilePicture`;
        this.uploader = new FileUploader({
          url: url,
          itemAlias: "profilePicture",
          allowedMimeType: ["image/jpeg"],
          maxFileSize: 5242880,
          method: "POST",
          queueLimit: 1,
          removeAfterUpload: true,
          headers: [
            {
              name: "Authorization",
              value: `Bearer ${token}`
            },
            {
              name: "Accept",
              value: "application/json"
            }
          ]
        });
      });

    this.uploader.onBeforeUploadItem = item => {
      item.withCredentials = false;
    };

    this.uploader.onWhenAddingFileFailed = (item, filter, options) => {
      this._toast.custom(
        "error",
        "Invalid File",
        "You 're file is invalid. Make sure you meet the requirements. Only jpeg/jpg file type is allowed with a max file size of 5mb."
      );
    };

    this.uploader.onSuccessItem = (item, response) => {
      const jsonResponse = JSON.parse(response);
      this._store.dispatch(
        new UserActions.ChangeProfilePhoto(jsonResponse.path)
      );
      this._toast.custom(
        "success",
        "File Upload Success",
        "You' re Profile Photo has been changed"
      );
    };

    this.uploader.onErrorItem = () => {
      this._toast.custom(
        "error",
        "Upload Failed",
        "There' s an error while uploading your file."
      );
    };
  }
}
