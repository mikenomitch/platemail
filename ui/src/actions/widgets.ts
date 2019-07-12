import { IWidget } from "../data/widgets";
import { IAction } from "../lib/types";

// ===========
//   ACTIONS
// ===========

export function getWidgets(): IAction {
  return {
    type: "GET_WIDGETS"
  };
}

export function getWidget(id: number): IAction {
  return {
    payload: id,
    type: "GET_WIDGET"
  };
}

export function createWidget(params: IWidget): IAction {
  return {
    payload: { params },
    type: "CREATE_WIDGET"
  };
}

export function deleteWidget(id: number): IAction {
  return {
    payload: id,
    type: "DELETE_WIDGET"
  };
}

export function updateWidget(id: number, params: IWidget): IAction {
  return {
    payload: { id, params },
    type: "UPDATE_WIDGET"
  };
}
