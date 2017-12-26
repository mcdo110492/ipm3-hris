import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromRoot from "@app/store/reducers";
import * as fromContent from "@content/store/reducers/content.reducer";
import * as ContentActions from "@content/store/actions/content.action";
import * as fromSidenav from "@content/store/reducers/sidenav.reducer";
import * as SidenavActions from "@content/store/actions/sidenav.action";
import * as fromUser from "@user/store/reducers/user.reducer";
import * as UserActions from "@user/store/actions/user.action";
import * as userSelectors from "@user/store/selectors/user.selector";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  titleBar: Observable<any>;
  profileName$: Observable<string>;
  profileImage$: Observable<string>;
  constructor(
    private contentStore$: Store<fromContent.State>,
    private sidenavStore$: Store<fromSidenav.State>,
    private userStore$: Store<fromUser.State>,
    private routerStore$: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    this.profileName$ = this.userStore$.select(
      userSelectors.getUserProfileName
    );
    this.profileImage$ = this.userStore$.select(
      userSelectors.getUserProfileImage
    );
    this.titleBar = this.routerStore$.select(fromRoot.getRouterState);
  }

  toggleSidenav() {
    this.sidenavStore$.dispatch(new SidenavActions.IsSidenavToggle());
  }

  logout() {
    this.userStore$.dispatch(new UserActions.LogoutUser());
  }
}
