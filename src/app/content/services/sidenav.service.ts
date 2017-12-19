import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromSidenav from "./../store/reducers/sidenav.reducer";
import * as SidenavActions from "./../store/actions/sidenav.action";

import { SidenavLink } from "./../models/sidenav-link.model";
import * as fromSidenavMetadata from "./../metadata/sidenav-links.metadata";

@Injectable()
export class SidenavService {
  constructor(private store$: Store<fromSidenav.State>) {}

  initializeLinkByRole(role: number) {
    if (role == 1) {
      this.store$.dispatch(
        new SidenavActions.SidenavLinks(fromSidenavMetadata.superAdminLinks)
      );
    } else if (role == 2) {
      this.store$.dispatch(
        new SidenavActions.SidenavLinks(fromSidenavMetadata.projectHrLinks)
      );
    }
  }
}
