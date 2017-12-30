import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { Position } from "./../../models/position.model";

export class PositionTableDataSource extends DataSource<Position> {
  constructor(private collections$: Observable<Position[]>) {
    super();
  }

  connect(): Observable<Position[]> {
    return this.collections$;
  }

  disconnect(): void {}
}
