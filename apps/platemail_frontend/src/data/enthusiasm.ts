// =========
//   TYPES
// =========

export interface IEnthusiasmStoreState {
  name: string;
  enthusiasmLevel: number;
}
export interface IIncrementEnthusiasm {
  type: "INCREMENT_ENTHUSIASM";
}

export interface IDecrementEnthusiasm {
  type: "DECREMENT_ENTHUSIASM";
}

export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm;

// ===========
//   ACTIONS
// ===========

export function incrementEnthusiasm(): IIncrementEnthusiasm {
  return {
    type: "INCREMENT_ENTHUSIASM"
  };
}

export function decrementEnthusiasm(): IDecrementEnthusiasm {
  return {
    type: "DECREMENT_ENTHUSIASM"
  };
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
