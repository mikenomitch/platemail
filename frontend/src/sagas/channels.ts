// import { put, takeEvery } from "redux-saga/effects";
import { IAction } from "../lib/types";

// TODOs:
// When you log out, disconnect
// When you log back in, reconnect to the socket

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

// const channelSagas = [takeEvery("JOIN_CHANNEL", joinChannel)];
// export default channelSagas;
