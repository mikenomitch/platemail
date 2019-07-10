// =========
//   TYPES
// =========

export interface IToast {
  id?: number;
  type: string;
  message: string;
  hidden?: boolean;
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

    case "HIDE_TOAST":
      const toast = state.toasts.find((t: IToast) => t.id === action.payload);
      if (!toast) {
        return state;
      }

      const withHidden = Object.assign({}, toast, { hidden: true });
      return Object.assign({}, state, {
        toasts: [withHidden]
      });

    case "REMOVE_TOAST":
      return Object.assign({}, state, {
        toasts: state.toasts.filter((t: IToast) => t.id !== action.payload)
      });

    default:
      return state;
  }
}
