import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { fadeAnimation } from "./../../../animations/fade.animation";

import * as fromContent from "./../../store/reducers/content.reducer";
import * as contentSelector from "./../../store/selectors/content.selector";
import * as fromSidenav from "./../../store/reducers/sidenav.reducer";
import * as SidenavActions from "./../../store/actions/sidenav.action";
import * as sidenavSelector from "./../../store/selectors/sidenav.selector";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  isLoginPage$: Observable<boolean>;
  isSidenavOpen$: Observable<boolean>;
  isSidenavMode$: Observable<string>;

  constructor(
    private contentStore$: Store<fromContent.State>,
    private sidenavStore$: Store<fromSidenav.State>
  ) {}

  ngOnInit() {
    this.isLoginPage$ = this.contentStore$.select(
      contentSelector.getIsLoginPage
    );
    this.isSidenavOpen$ = this.sidenavStore$.select(
      sidenavSelector.getIsSidenavOpen
    );
    this.isSidenavMode$ = this.sidenavStore$.select(
      sidenavSelector.getIsSidenavMode
    );
  }

  routeState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }

  backDropClick() {
    this.sidenavStore$.dispatch(new SidenavActions.IsSidenavOpen(false));
  }
}
