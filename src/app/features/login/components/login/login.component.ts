import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import * as fromLogin from "./../../store/reducers/login.reducer";
import * as LoginActions from "./../../store/actions/login.action";
import * as fromContent from "@content/store/reducers/content.reducer";
import * as ContentSelectors from "@content/store/selectors/content.selector";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginPage: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromLogin.State>,
    private contentStore$: Store<fromContent.State>
  ) {}

  ngOnInit() {
    this.createForm();
    this.isLoginPage = this.contentStore$.select(
      ContentSelectors.getIsLoginPage
    );
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  authenticate() {
    const credentials = this.loginForm.value;
    this.store$.dispatch(new LoginActions.LoginCredentials(credentials));
  }
}
