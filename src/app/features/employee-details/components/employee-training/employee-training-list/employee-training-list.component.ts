import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as TrainingActions from "./../../../store/actions/employee-training.action";
import * as fromTraining from "./../../../store/reducers/employee-training.reducer";
import * as TrainingSelectors from "./../../../store/selectors/employee-training.selector";

import { EmployeeTraining } from "./../../../models/employee-training.model";
import { EmployeeTrainingTableDataSource } from "./employee-training-list.datasource";

import { EmployeeTrainingService } from "./../../../services/employee-training.service";

@Component({
  selector: "app-employee-training-list",
  templateUrl: "./employee-training-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeTrainingListComponent implements OnInit {
  displayedColumns = [
    "trainingName",
    "trainingTitle",
    "trainingFrom",
    "trainingTo",
    "actions"
  ];
  dataSource: EmployeeTrainingTableDataSource | null;
  collections$: Observable<EmployeeTraining[]>;
  isLoading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromTraining.State>,
    private service: EmployeeTrainingService
  ) {}

  ngOnInit() {
    this.collections$ = this.store$.select(TrainingSelectors.getTrainingData);
    this.isLoading$ = this.store$.select(
      TrainingSelectors.getTrainingIsLoading
    );
    this.isLoaded$ = this.store$.select(TrainingSelectors.getTrainingIsLoaded);

    this.dataSource = new EmployeeTrainingTableDataSource(this.collections$);

    this.store$.dispatch(new TrainingActions.LoadTraining());
  }

  create() {
    this.store$.dispatch(new TrainingActions.SelectTraining(null));
    this.service.openForm();
  }

  update(id: number) {
    this.store$.dispatch(new TrainingActions.SelectTraining(id));
    this.service.openForm();
  }
}
