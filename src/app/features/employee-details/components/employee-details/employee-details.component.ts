import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { MatTabChangeEvent } from "@angular/material/tabs";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as RouterActions from "@app/store/actions";
import * as fromRouter from "@app/store/reducers";
import * as EmployeeDetailsSelectors from "./../../store/selectors/employee-details.selector";
import * as PersonalActions from "./../../store/actions/employee-personal.action";
import * as fromPersonal from "./../../store/reducers/employee-personal.reducer";
import * as PersonalSelectors from "./../../store/selectors/employee-personal.selector";

import { EmployeeDetailsService } from "./../../services/employee-details.service";

import { fadeAnimation } from "@animations/fade.animation";

import { EmployeePersonal } from "./../../models/employee-personal.model";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.scss"],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent implements OnInit {
  personalInfo: Observable<EmployeePersonal>;
  routerState: Observable<fromRouter.RouterStateUrl>;
  selectedRouteIndex$: Observable<number>;
  constructor(
    private routerStore$: Store<fromRouter.State>,
    private service: EmployeeDetailsService,
    private route: ActivatedRoute,
    private personalStore$: Store<fromPersonal.State>,
    private router: Router
  ) {}

  ngOnInit() {
    this.personalStore$.dispatch(new PersonalActions.LoadPersonalInfo());
    this.personalInfo = this.personalStore$.select(
      PersonalSelectors.getPersonalData
    );
    this.routerState = this.routerStore$.select(
      EmployeeDetailsSelectors.getRouterState
    );
    this.checkCurrentRouteTab();
  }

  //This is to navigate between the tab depending of the index of the tab change event emitted
  routeTabChange(ev: MatTabChangeEvent) {
    const { index } = ev;
    let path: string;
    if (index == 0) {
      path = "personal";
    } else if (index == 1) {
      path = "employment";
    } else if (index == 2) {
      path = "contact";
    } else if (index == 3) {
      path = "government";
    } else if (index == 4) {
      path = "salary";
    } else if (index == 5) {
      path = "health";
    } else if (index == 6) {
      path = "license";
    } else if (index == 7) {
      path = "educational";
    } else if (index == 8) {
      path = "training";
    } else if (index == 9) {
      path = "club";
    } else if (index == 10) {
      path = "account/setting";
    }

    this.router.navigate([path], { relativeTo: this.route });
  }

  //Check the current route tab label to highlight the tab label depending on the route label
  checkCurrentRouteTab() {
    this.routerState.pipe(take(1)).subscribe(router => {
      this.selectedRouteIndex$ = this.service.currentRouteTab(router.data);
    });
  }

  //This is to trigger the animation in the router-outlet
  prepRouteState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : "";
  }
}
