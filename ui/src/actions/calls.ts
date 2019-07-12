import { IAction } from "../lib/types";

function __callAction(callKey: string, callStatus: string) {
  return {
    payload: {
      key: callKey,
      status: callStatus
    },
    type: "SET_CALL"
  };
}

export function callError(callKey: string): IAction {
  return __callAction(callKey, "error");
}

export function callStart(callKey: string): IAction {
  return __callAction(callKey, "started");
}

export function callSuccess(callKey: string): IAction {
  return __callAction(callKey, "success");
}
