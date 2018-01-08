import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";
import * as fromProject from "./../../store/reducers/project.reducer";
import * as ProjectActions from "./../../store/actions/project.action";
import * as ProjectSelectors from "./../../store/selectors/project.selector";

import { Project } from "./../../models/project.model";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  selectedProject$: Observable<Project>;
  isSaving$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private store$: Store<fromProject.State>,
    private dialogRef: MatDialogRef<ProjectFormComponent>
  ) {}

  ngOnInit() {
    this.createForm();
    this.selectedProject$ = this.store$.select(
      ProjectSelectors.getProjectSelectedEntityData
    );

    this.isSaving$ = this.store$.select(ProjectSelectors.getIsSavingLoading);

    this.selectedProject$.pipe(take(1)).subscribe(response => {
      if (response != null) {
        this.projectForm.setValue({
          projectId: response.projectId,
          projectCode: response.projectCode,
          projectName: response.projectName,
          projectTableHash: response.projectTableHash
        });
      }
    });
  }

  createForm() {
    this.projectForm = this.fb.group({
      projectId: [0, Validators.required],
      projectCode: [null, [Validators.required, Validators.maxLength(20)]],
      projectName: [null, [Validators.required, Validators.maxLength(150)]],
      projectTableHash: [null]
    });
  }

  getCurrentId() {
    return this.projectForm.get("projectId").value;
  }

  submitForm() {
    const id = this.getCurrentId();
    if (id == 0) {
      this.store$.dispatch(
        new ProjectActions.CreateProject(this.projectForm.value)
      );
    } else {
      this.store$.dispatch(
        new ProjectActions.UpdateProject(this.projectForm.value)
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
