import { Injectable } from "@angular/core";
import {
  Event,
  NavigationStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError
} from "@angular/router";

import { Store } from "@ngrx/store";

import * as ContentActions from "@content/store/actions";
import * as fromContent from "@content/store/reducers";

@Injectable()
export class PageLoaderService {
  constructor(private store$: Store<fromContent.ContentState>) {}

  navigationsEvent(event: Event) {
    if (event instanceof NavigationStart) {
      this.store$.dispatch(new ContentActions.IsPageLoader(true));
    } else if (
      event instanceof NavigationCancel ||
      event instanceof NavigationEnd ||
      event instanceof NavigationError
    ) {
      this.store$.dispatch(new ContentActions.IsPageLoader(false));
    }
  }
}
