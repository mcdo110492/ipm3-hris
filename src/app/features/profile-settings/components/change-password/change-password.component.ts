import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs/Observable";

import { PasswordMatchValidtor } from "@shared/custom-validators/password-match.validator";

import { Store } from "@ngrx/store";
import * as ProfileActions from "./../../store/actions/profile-settings.action";
import * as fromProfile from "./../../store/reducers/profile-settings.reducer";
import * as ProfileSelectors from "./../../store/selectors/profile-settings.selector";
import { ConfirmDialogService } from "@app/core";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  profileForm: FormGroup;
  isLoading$: Observable<boolean>;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromProfile.State>,
    private confirm: ConfirmDialogService
  ) {}

  ngOnInit() {
    this.isLoading$ = this._store.select(
      ProfileSelectors.getProfileSettingsIsLoading
    );
    this.createForm();
  }

  createForm() {
    this.profileForm = this._fb.group(
      {
        oldPassword: [null, Validators.required],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required]
      },
      {
        validator: PasswordMatchValidtor.MatchPassword
      }
    );
  }

  changePassword() {
    const confirm = this.confirm.openConfirm(
      "Change Password",
      "Would you like to change your password? You will be logout automatically."
    );
    confirm.afterClosed().subscribe(response => {
      if (response) {
        this._store.dispatch(
          new ProfileActions.ChangePassword(this.profileForm.value)
        );
      }
    });
  }
}
