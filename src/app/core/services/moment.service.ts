import { Injectable } from "@angular/core";

import * as moment from "moment";

@Injectable()
export class MomentService {
  parseDateToMoment(date: Date | string) {
    moment.locale();
    return moment(date).format("LL");
  }
}
