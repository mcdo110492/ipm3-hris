import { createSelector } from "@ngrx/store";

import * as fromRootRouter from "@app/store/reducers";

export const getRouterState = createSelector(
  fromRootRouter.getRouterState,
  route => route.state
);
