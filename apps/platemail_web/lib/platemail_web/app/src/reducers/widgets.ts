import { IAction } from "../lib/types";
import makeCrudReducer from "./crud";

// =========
//   TYPES
// =========

export interface IWidget {
  content: string | null;
  id: number;
  title: string | null;
  user_id: number | null;
}

// ===========
//   ACTIONS
// ===========

export function getWidgets(): IAction {
  return {
    type: "GET_WIDGETS"
  };
}

// ===========
//   REDUCER
// ===========

export const widgets = makeCrudReducer("WIDGET");
