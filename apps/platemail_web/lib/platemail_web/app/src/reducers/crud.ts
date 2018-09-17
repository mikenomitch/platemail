import { IWidget } from "./widgets";

// =========
//   TYPES
// =========

export type CrudType = IWidget;

export interface ICrudReducerState<T> {
  items: T[];
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
  action: IUpsertItem<CrudType>
): ICrudReducerState<CrudType> => {
  const newItems = state.items
    .filter(item => action.payload.id === item.id)
    .concat([action.payload]);

  return { ...state, items: newItems };
};

const handleUpsertItems = (
  state: ICrudReducerState<CrudType>,
  action: IUpsertItems<CrudType>
): ICrudReducerState<CrudType> => {
  const addedIds = action.payload.map(i => i.id);
  const newItems = state.items
    .filter(item => !addedIds.includes(item.id))
    .concat(action.payload);

  return { ...state, items: newItems };
};

const handleRemoveItem = (
  state: ICrudReducerState<CrudType>,
  action: IRemoveItem
): ICrudReducerState<CrudType> => {
  const itemsWithRemoved = state.items.filter(
    item => item.id !== action.payload
  );

  return { ...state, items: itemsWithRemoved };
};

const handleRemoveItems = (
  state: ICrudReducerState<CrudType>,
  action: IRemoveItems
): ICrudReducerState<CrudType> => {
  const filteredItems = state.items.filter(
    item => !action.payload.includes(item.id)
  );

  return { ...state, items: filteredItems };
};

// Top level reducer

const makeCrudReducer = (name: string) => {
  return (
    state: ICrudReducerState<CrudType> = defaultState,
    action: HashActions
  ): ICrudReducerState<CrudType> => {
    switch (action.type) {
      case `UPSERT_${name}`:
        return handleUpsertItem(state, action as IUpsertItem<CrudType>);
      case `UPSERT_${name}S`:
        return handleUpsertItems(state, action as IUpsertItems<CrudType>);
      case `REMOVE_${name}`:
        return handleRemoveItem(state, action as IRemoveItem);
      case `REMOVE_${name}S`:
        return handleRemoveItems(state, action as IRemoveItems);
    }
    return state;
  };
};

export default makeCrudReducer;
