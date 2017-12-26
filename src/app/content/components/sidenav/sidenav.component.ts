import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { SidenavLink } from "@content/models/sidenav-link.model";

import * as fromSidenav from "@content/store/reducers/sidenav.reducer";
import * as sidenavSelectors from "@content/store/selectors/sidenav.selector";
import * as fromUser from "@user/store/reducers/user.reducer";
import * as userSelectors from "@user/store/selectors/user.selector";

import { SidenavService } from "@content/services/sidenav.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  links$: Observable<SidenavLink[]>;
  profileName$: Observable<string>;
  profileImage$: Observable<string>;
  role$: Observable<number>;
  constructor(
    private sidenavStore$: Store<fromSidenav.State>,
    private userStore$: Store<fromUser.State>,
    private service: SidenavService
  ) {}

  ngOnInit() {
    this.links$ = this.sidenavStore$.select(sidenavSelectors.getSidenavLinks);
    this.profileName$ = this.userStore$.select(
      userSelectors.getUserProfileName
    );
    this.profileImage$ = this.userStore$.select(
      userSelectors.getUserProfileImage
    );
    this.role$ = this.userStore$.select(userSelectors.getUserUserRole);

    this.subscription = this.role$.subscribe(role =>
      this.service.initializeLinkByRole(role)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
