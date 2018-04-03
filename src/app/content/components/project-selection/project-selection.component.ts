import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import * as ContentProjectActions from "@content/store/actions/project.action";
import * as fromContentProject from "@content/store/reducers/project.reducer";
import * as ProjectSelector from "@content/store/selectors/project.selector";

import * as RootActions from "@app/store/actions/router.action";

import { Project } from "@features/project/models/project.model";

@Component({
  selector: "app-project-selection",
  templateUrl: "./project-selection.component.html",
  styleUrls: ["./project-selection.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectionComponent implements OnInit {
  projects: Observable<Project[]>;
  currentProject: number;
  constructor(
    private store$: Store<fromContentProject.State>,
    private routerStore$: Store<any>
  ) {}

  ngOnInit() {
    this.store$.dispatch(new ContentProjectActions.LoadAllProject());
    this.projects = this.store$.select(ProjectSelector.getProjectsData);

    this.store$
      .select(ProjectSelector.getSelectedProjectId)
      .pipe(take(1))
      .subscribe(id => {
        this.currentProject = id;
      });
  }

  onSelectProject(id: number) {
    this.store$.dispatch(new ContentProjectActions.SelectProject(id));
    this.routerStore$.dispatch(new RootActions.Go({ path: ["projects"] }));
  }
}
