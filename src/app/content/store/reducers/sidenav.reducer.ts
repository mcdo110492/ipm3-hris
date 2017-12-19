import * as fromSidenav from "./../actions/sidenav.action";
import { SidenavLink } from "./../../models/sidenav-link.model";

export interface State {
  isSidenavOpen: boolean;
  isSidenavMode: string;
  links: SidenavLink[];
}

export const initialState: State = {
  isSidenavOpen: false,
  isSidenavMode: "side",
  links: []
};

export function reducer(
  state = initialState,
  action: fromSidenav.SidenavActions
): State {
  switch (action.type) {
    case fromSidenav.IS_SIDENAV_OPEN: {
      return { ...state, isSidenavOpen: action.payload };
    }

    case fromSidenav.IS_SIDENAV_TOGGLE: {
      return { ...state, isSidenavOpen: !state.isSidenavOpen };
    }

    case fromSidenav.IS_SIDENAV_MODE: {
      return { ...state, isSidenavMode: action.payload };
    }

    case fromSidenav.SIDENAV_LINKS: {
      return { ...state, links: action.payload };
    }
  }

  return state;
}

export const isSidenavOpen = (state: State) => state.isSidenavOpen;
export const isSidenavMode = (state: State) => state.isSidenavMode;
export const sidenavLinks = (state: State) => state.links;
