import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as ProjectActions from "./../../store/actions";
import * as fromProject from "./../../store/reducers/project.reducer";
import * as ProjectSelectors from "./../../store/selectors/project.selector";

import { ProjectTableDataSource } from "./project.datasource";
import { Project } from "./../../models/project.model";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit {
  displayedColumns = ["projectCode", "projectName", "actions"];
  dataSource: ProjectTableDataSource | null;
  collections$: Observable<Project[]>;
  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSizeOptions = [5, 10, 15, 30, 50, 100];

  searchQuery$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<fromProject.State>) {}

  ngOnInit() {
    this.collections$ = this.store$.select(ProjectSelectors.getProjectData);
    this.pageLength$ = this.store$.select(
      ProjectSelectors.getProjectPageLength
    );
    this.pageSize$ = this.store$.select(ProjectSelectors.getProjectPageSize);
    this.pageIndex$ = this.store$.select(ProjectSelectors.getProjectPageIndex);
    this.searchQuery$ = this.store$.select(
      ProjectSelectors.getProjectSearchQuery
    );

    this.dataSource = new ProjectTableDataSource(this.collections$);
    this.store$.dispatch(new ProjectActions.LoadProject());
  }

  pageEvent(ev: PageEvent) {}

  sortEvent(ev: Sort) {}

  search(ev) {}
}
