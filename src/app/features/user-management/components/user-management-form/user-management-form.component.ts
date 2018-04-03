import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";
import * as fromUserManagement from "./../../store/reducers/user-management.reducer";
import * as UserManagementActions from "./../../store/actions/user-management.action";
import * as UserManagementSelectors from "./../../store/selectors/user-management.selector";

import { UserManagementModel } from "./../../models/user-management.model";

@Component({
  selector: "app-user-management-form",
  templateUrl: "./user-management-form.component.html"
})
export class UserManagementFormComponent implements OnInit {
  userManagementForm: FormGroup;
  isSavingLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromUserManagement.State>,
    private dialogRef: MatDialogRef<UserManagementFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();

    this.isSavingLoading$ = this.store$.select(
      UserManagementSelectors.getIsSavingLoading
    );
  }

  createForm() {
    this.userManagementForm = this.fb.group({
      username: [null, Validators.required],
      profileName: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  submitForm() {
    this.store$.dispatch(
      new UserManagementActions.CreateUserManagement(
        this.userManagementForm.value
      )
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
