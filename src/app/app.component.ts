import {
  Component,
  OnInit,
  OnDestroy,
  ViewContainerRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr/ng2-toastr";

import { Subscription } from "rxjs/Subscription";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromContent from "./content/store";

import { PageLoaderService } from "./core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  subscribers: Subscription;

  isPageLoader$: Observable<boolean>;

  constructor(
    private store$: Store<fromContent.ContentState>,
    private vcr: ViewContainerRef,
    private toastManager: ToastsManager,
    private router: Router,
    private pageLoaderService: PageLoaderService
  ) {}

  ngOnInit() {
    this.toastManager.setRootViewContainerRef(this.vcr);

    this.isPageLoader$ = this.store$.select(fromContent.getIsPageLoader);

    this.subscribers = this.router.events.subscribe(ev =>
      this.pageLoaderService.navigationsEvent(ev)
    );
  }

  ngOnDestroy() {
    this.subscribers.unsubscribe();
  }
}
