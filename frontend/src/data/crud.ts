import { IWidget } from "./widgets";

// =========
//   TYPES
// =========

export type CrudType = IWidget;

export interface ICrudReducerState<T> {
  items: T[];
}

export interface IHandleEvent<T> {
  payload: any;
  type: string;
}

export interface IUpsertItem<T> {
  payload: T;
  type: string;
}

export interface IUpsertItems<T> {
  payload: T[];
  type: string;
}

export interface IRemoveItem {
  payload: number;
  type: string;
}

export interface IRemoveItems {
  payload: number[];
  type: string;
}

export type HashActions =
  | IHandleEvent<CrudType>
  | IUpsertItem<CrudType>
  | IUpsertItems<CrudType>
  | IRemoveItem
  | IRemoveItems;

// =================
//   REDUCER MAKER
// =================

// Starting state

const defaultState = {
  items: []
};

// Action-Specific Logic

const handleUpsertItem = (
  state: ICrudReducerState<CrudType>,
  payload: CrudType
): ICrudReducerState<CrudType> => {
  const newItems = state.items
    .filter(item => payload.id !== item.id)
    .concat([payload]);

  return { ...state, items: newItems };
};

const handleUpsertItems = (
  state: ICrudReducerState<CrudType>,
  payload: CrudType[]
): ICrudReducerState<CrudType> => {
  const addedIds = payload.map(i => i.id);
  const newItems = state.items
    .filter(item => !addedIds.includes(item.id))
    .concat(payload);

  return { ...state, items: newItems };
};

const handleRemoveItem = (
  state: ICrudReducerState<CrudType>,
  payload: number
): ICrudReducerState<CrudType> => {
  const itemsWithRemoved = state.items.filter(item => item.id !== payload);
  return { ...state, items: itemsWithRemoved };
};

const handleEvent = (
  state: ICrudReducerState<CrudType>,
  payload: { type: string; item: CrudType }
): ICrudReducerState<CrudType> => {
  switch (payload.type) {
    case "created":
      return handleUpsertItem(state, payload.item);
    case "updated":
      return handleUpsertItem(state, payload.item);
    case "deleted":
      return handleRemoveItem(state, payload.item.id);
    default:
      return state;
  }
};

// Top level reducer

const makeCrudReducer = (name: string) => {
  return (
    state: ICrudReducerState<CrudType> = defaultState,
    action: HashActions
  ): ICrudReducerState<CrudType> => {
    switch (action.type) {
      case `${name}_EVENT`:
        return handleEvent(state, action.payload);
      case `UPSERT_${name}`:
        return handleUpsertItem(state, action.payload);
      case `UPSERT_${name}S`:
        return handleUpsertItems(state, action.payload);
      case `REMOVE_${name}`:
        return handleRemoveItem(state, action.payload);
    }
    return state;
  };
};

export default makeCrudReducer;
