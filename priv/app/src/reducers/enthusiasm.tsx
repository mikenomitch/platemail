// =========
//   TYPES
// =========

export interface IExampleStoreState {
  name: string;
  enthusiasmLevel: number;
}

// =============
//   CONSTANTS
// =============

export const INCREMENT_ENTHUSIASM = "INCREMENT_ENTHUSIASM";
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = "DECREMENT_ENTHUSIASM";
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

// ===========
//   ACTIONS
// ===========

export interface IIncrementEnthusiasm {
  type: INCREMENT_ENTHUSIASM;
}

export interface IDecrementEnthusiasm {
  type: DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm;

export function incrementEnthusiasm(): IIncrementEnthusiasm {
  return {
    type: INCREMENT_ENTHUSIASM
  };
}

export function decrementEnthusiasm(): IDecrementEnthusiasm {
  return {
    type: DECREMENT_ENTHUSIASM
  };
}

// ===========
//   REDUCER
// ===========

export function enthusiasm(
  state: IExampleStoreState,
  action: EnthusiasmAction
): IExampleStoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state,
        enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)
      };
  }
  return state;
}
