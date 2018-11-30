// =========
//   TYPES
// =========

export interface IToast {
  id?: number;
  type: string;
  message: string;
}

const defaultState = {
  toasts: []
};

// ===========
//   REDUCER
// ===========

export function ui(state = defaultState, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return Object.assign({}, state, {
        toasts: [action.payload]
      });
    case "REMOVE_TOAST":
      return Object.assign({}, state, {
        toasts: state.toasts.filter((t: IToast) => t.id !== action.payload)
      });
    default:
      return state;
  }
}
