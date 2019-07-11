import { baseSocketUrl } from "../lib/runtimeEnv";
import { Socket } from "../vendor/phoenix";

const defaultState = {
  channels: {},
  socket: null
};

const merge = (objA, objB) => {
  return Object.assign({}, objA, objB);
};

// =================
//   STATE CHANGES
// =================

function __addSocket(state) {
  console.log("baseSocketUrl", baseSocketUrl());
  const socket = new Socket(baseSocketUrl(), { params: {} });
  socket.connect(null);

  return merge(state, { socket });
}

function __joinChannel(state, { name, params, callbacks }) {
  const { channels: originalChannels, socket } = state;
  const channel = socket.channel(name, params);

  channel.join();

  Object.keys(callbacks).forEach(eventName => {
    channel.on(eventName, callbacks[eventName]);
  });

  const newChannels = merge(originalChannels, {
    [name]: channel
  });

  return merge(state, { channels: newChannels });
}

function __leaveUserChannels(state) {
  const newChannelKeys = Object.keys(state.channels).filter(
    channelName => !channelName.startsWith("users")
  );

  const newChannels = newChannelKeys.reduce((memo, channelName) => {
    memo[channelName] = state.channels[channelName];
    return memo;
  }, {});

  return merge(state, { channels: newChannels });
}

// ===========
//   REDUCER
// ===========

export function channels(state = defaultState, action) {
  switch (action.type) {
    case "CONNECT_TO_SOCKET":
      return __addSocket(state);

    case "JOIN_CHANNEL":
      return __joinChannel(state, action.payload);

    case "LEAVE_USER_CHANNELS":
      return __leaveUserChannels(state);

    default:
      return state;
  }
}
