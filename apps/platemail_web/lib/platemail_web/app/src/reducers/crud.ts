import { IWidget } from "./widgets";

// =========
//   TYPES
// =========

export type CrudType = IWidget;

export interface ICrudReducerState<T> {
  items: T[];
}
export interface IUpsertItem<T> {
  payload: {
    item: T;
  };
  type: string;
}

export interface IUpsertItems<T> {
  payload: {
    items: T[];
  };
  type: "UPSERT_WIDGETS";
}

export interface IRemoveItem {
  payload: {
    id: number;
  };
  type: string;
}

export interface IRemoveItems {
  payload: {
    ids: number[];
  };
  type: string;
}

export type HashActions =
  | IUpsertItem<CrudType>
  | IUpsertItems<CrudType>
  | IRemoveItem
  | IRemoveItems;

// =================
//   REDUCER MAKER
// =================

const defaultState = {
  items: []
};

const makeCrudReducer = (name: string) => {
  return (
    state: ICrudReducerState<CrudType> = defaultState,
    action: HashActions
  ): ICrudReducerState<CrudType> => {
    switch (action.type) {
      case `UPSERT_${name}`:
        return {
          ...state,
          items: []
        };

      case `UPSERT_WIDGETS`:
        return {
          ...state,
          items: action.payload.items || []
        };

      case `REMOVE_${name}`:
        return {
          ...state,
          items: []
        };

      case `UPSERT_${name}S`:
        return {
          ...state,
          items: []
        };
    }
    return state;
  };
};

export default makeCrudReducer;
