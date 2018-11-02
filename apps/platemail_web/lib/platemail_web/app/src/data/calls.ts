import withResetState from "./withResetState";

// ===========
//   ACTIONS
// ===========

// Tracking the calls (sync actions)

export function callError(callKey: string) {
  return {
    payload: {
      key: callKey,
      status: "error"
    },
    type: "SET_CALL"
  };
}

export function callStart(callKey: string) {
  return {
    payload: {
      key: callKey,
      status: "started"
    },
    type: "SET_CALL"
  };
}

export function callSuccess(callKey: string) {
  return {
    payload: {
      key: callKey,
      status: "success"
    },
    type: "SET_CALL"
  };
}

// Note: Action creators for actually
// making calls are in the api saga

// ====================
//   EXTERNAL HELPERS
// ====================

export const callStatus = call => {
  return (call && call.status) || "uncalled";
};

export const callSuccessfull = call => {
  return callStatus(call) === "success";
};

export const everHadSuccess = call => {
  return call && (callSuccessfull(call) || everHadSuccess(call.previousCall));
};

export const callsDone = (state, callKeys) => {
  return callKeys.every(callKey => everHadSuccess(state.calls[callKey]));
};

// ===========
//   REDUCER
// ===========

function __setCall(state, payload) {
  const newCallVal = Object.assign({}, payload, {
    previousCall: state[payload.key]
  });
  return Object.assign({}, state, { [payload.key]: newCallVal });
}

const defaultState = {};
function callReducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_CALL":
      return __setCall(state, action.payload);
    default:
      return state;
  }
}

export const calls = withResetState(defaultState, "SIGN_OUT")(callReducer);
