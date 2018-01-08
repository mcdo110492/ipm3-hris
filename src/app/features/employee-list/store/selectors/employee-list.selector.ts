import { createSelector } from "@ngrx/store";

import * as fromFeature from "./../reducers";
import * as fromEmployeeList from "./../reducers/employee-list.reducer";

export const getEmployeeList = createSelector(
  fromFeature.getEmployeeListState,
  (state: fromFeature.EmployeeListState) => state.employeeList
);

export const getEmployeeListPageLength = createSelector(
  getEmployeeList,
  fromEmployeeList.getPageLength
);
export const getEmployeeListPageSize = createSelector(
  getEmployeeList,
  fromEmployeeList.getPageSize
);
export const getEmployeeListPageIndex = createSelector(
  getEmployeeList,
  fromEmployeeList.getPageIndex
);
export const getEmployeeListSortField = createSelector(
  getEmployeeList,
  fromEmployeeList.getSortField
);
export const getEmployeeListSortDirection = createSelector(
  getEmployeeList,
  fromEmployeeList.getSortDirection
);
export const getEmployeeListSearchQuery = createSelector(
  getEmployeeList,
  fromEmployeeList.getSearchQuery
);
export const getEmployeeListEntities = createSelector(
  getEmployeeList,
  fromEmployeeList.getEntities
);
export const getEmployeeListData = createSelector(
  getEmployeeListEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getEmployeeListIsLoading = createSelector(
  getEmployeeList,
  fromEmployeeList.getIsLoading
);
