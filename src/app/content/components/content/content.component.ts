import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";

import {
  ObservableMedia,
  MediaService,
  MediaChange
} from "@angular/flex-layout";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { fadeAnimation } from "@animations/fade.animation";

import * as fromContent from "@content/store/reducers/content.reducer";
import * as contentSelector from "@content/store/selectors/content.selector";
import * as fromSidenav from "@content/store/reducers/sidenav.reducer";
import * as SidenavActions from "@content/store/actions/sidenav.action";
import * as sidenavSelector from "@content/store/selectors/sidenav.selector";

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoginPage$: Observable<boolean>;
  isSidenavOpen$: Observable<boolean>;
  isSidenavMode$: Observable<string>;

  constructor(
    private contentStore$: Store<fromContent.State>,
    private sidenavStore$: Store<fromSidenav.State>,
    private observableMedia$: ObservableMedia
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

    this.subscription = this.observableMedia$.subscribe((mc: MediaChange) => {
      const viewPort = mc.mqAlias;
      if (viewPort === "xs" || viewPort === "sm") {
        this.sidenavStore$.dispatch(new SidenavActions.IsSidenavMode("over"));
        this.sidenavStore$.dispatch(new SidenavActions.IsSidenavOpen(false));
      } else {
        this.sidenavStore$.dispatch(new SidenavActions.IsSidenavMode("side"));
        this.sidenavStore$.dispatch(new SidenavActions.IsSidenavOpen(true));
      }
    });
  }

  routeState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }

  backDropClick() {
    this.sidenavStore$.dispatch(new SidenavActions.IsSidenavOpen(false));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
