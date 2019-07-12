// =========
//   TYPES
// =========

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
