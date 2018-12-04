import { IAction } from "../lib/types";

export function connectToSocket(): IAction {
  return {
    type: "CONNECT_TO_SOCKET"
  };
}

export function joinChannel(name: string, params: object): IAction {
  return {
    payload: { name, params },
    type: "JOIN_CHANNEL"
  };
}

export function leaveUserChannels(): IAction {
  return {
    type: "LEAVE_USER_CHANNELS"
  };
}
