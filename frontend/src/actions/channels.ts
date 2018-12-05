import { put, takeEvery } from "redux-saga/effects";
import { IAction } from "../lib/types";

interface ICallbacksMap {
  [s: string]: (input: any) => void;
}

export function connectToSocket(): IAction {
  return {
    type: "CONNECT_TO_SOCKET"
  };
}

export function joinChannels(user, token): IAction {
  return {
    payload: {
      token,
      user
    },
    type: "JOIN_USER_CHANNELS"
  };
}

export function joinChannel(
  name: string,
  params: object,
  callbacks: ICallbacksMap
): IAction {
  return {
    payload: { name, params, callbacks },
    type: "JOIN_CHANNEL"
  };
}

export function leaveUserChannels(): IAction {
  return {
    type: "LEAVE_USER_CHANNELS"
  };
}

function* joinUserChannels(action, dispatch, getState) {
  const generalChannelCallbacks = {
    widget_event: res => {
      dispatch({ type: "WIDGET_EVENT", payload: res });
    }
  };
  const individualChannelCallbacks = {};

  yield put(joinChannel("users:general", {}, generalChannelCallbacks));
  yield put(
    joinChannel(
      `users:${action.payload.user.id}`,
      { token: action.payload.token },
      individualChannelCallbacks
    )
  );
}

export const channelSagas = (dispatch, getState) => [
  takeEvery("JOIN_USER_CHANNELS", action =>
    joinUserChannels(action, dispatch, getState)
  )
];
