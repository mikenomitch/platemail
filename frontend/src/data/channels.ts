import { BASE_SOCKET_URL } from "../lib/constants";
import { Socket } from "../lib/phoenix";

const defaultState = {
  channels: {},
  socket: null
};

// =================
//   STATE CHANGES
// =================

function __addSocket(state) {
  const socket = new Socket(BASE_SOCKET_URL, { params: {} });
  socket.connect(null);

  return Object.assign({}, state, { socket });
}

function __joinChannel(state, { name, params, callbacks }) {
  const { channels: originalChannels, socket } = state;
  const channel = socket.channel(name, params);

  channel.join();
  Object.keys(callbacks).forEach(eventName => {
    channel.on(eventName, callbacks[eventName]);
  });

  const newChannels = Object.assign({}, originalChannels, {
    [name]: channel
  });

  return Object.assign({}, state, { channels: newChannels });
}

function __leaveUserChannels(state) {
  const newChannelKeys = Object.keys(state.channels).filter(
    channelName => !channelName.startsWith("users")
  );

  const newChannels = newChannelKeys.reduce((memo, channelName) => {
    memo[channelName] = state.channels[channelName];
    return memo;
  }, {});

  return Object.assign({}, state, { channels: newChannels });
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
