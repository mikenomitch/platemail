import { EnthusiasmAction } from "../actions/enthusiasm";

// =========
//   TYPES
// =========

export interface IEnthusiasmStoreState {
  name: string;
  enthusiasmLevel: number;
}

// ===========
//   REDUCER
// ===========

const defaultState = {
  enthusiasmLevel: 1,
  name: "Mike"
};

export function enthusiasm(
  state: IEnthusiasmStoreState = defaultState,
  action: EnthusiasmAction
): IEnthusiasmStoreState {
  switch (action.type) {
    case "INCREMENT_ENTHUSIASM":
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case "DECREMENT_ENTHUSIASM":
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)
      };
  }
  return state;
}
