import { Injectable } from "@angular/core";

import * as moment from "moment";

@Injectable()
export class MomentService {
  parseDateToMoment(date: Date | string) {
    moment.locale();
    const parseDate = moment(date);

    return parseDate.isValid() ? parseDate.format("LL") : null;
  }
}
