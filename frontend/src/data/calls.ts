import withResetState from "./withResetState";

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
