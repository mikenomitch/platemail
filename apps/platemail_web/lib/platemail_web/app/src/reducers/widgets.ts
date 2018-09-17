// =============
//   CONSTANTS
// =============

const defaultState = {
  items: []
};

export const UPSERT_ITEM = "UPSERT_ITEM";
export const UPSERT_ITEMS = "UPSERT_ITEMS";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const REMOVE_ITEMS = "REMOVE_ITEMS";
export const GET_ITEMS = "GET_ITEMS";

// =========
//   TYPES
// =========

export interface IWidget {
  name: string | null;
  content: string | null;
  user_id: number | null;
}

export interface IWidgetReducerState {
  items: IWidget[];
}

export type UPSERT_ITEM = typeof UPSERT_ITEM;
export type UPSERT_ITEMS = typeof UPSERT_ITEMS;
export type REMOVE_ITEM = typeof REMOVE_ITEM;
export type REMOVE_ITEMS = typeof REMOVE_ITEMS;
export type GET_ITEMS = typeof GET_ITEMS;

export interface IUpsertItem {
  type: UPSERT_ITEM;
}

export interface IUpsertItems {
  type: UPSERT_ITEMS;
}

export interface IRemoveItem {
  type: REMOVE_ITEM;
}

export interface IRemoveItems {
  type: REMOVE_ITEMS;
}

export interface IGetItems {
  type: GET_ITEMS;
}

export type HashActions =
  | IUpsertItem
  | IUpsertItems
  | IRemoveItem
  | IRemoveItems
  | IGetItems;

// ===========
//   ACTIONS
// ===========

export function upsertItem(): IUpsertItem {
  return {
    type: UPSERT_ITEM
  };
}

export function upsertItems(): IUpsertItems {
  return {
    type: UPSERT_ITEMS
  };
}

export function removeItem(): IRemoveItem {
  return {
    type: REMOVE_ITEM
  };
}

export function removeItems(): IRemoveItems {
  return {
    type: REMOVE_ITEMS
  };
}

export function getItems(): IGetItems {
  return {
    type: GET_ITEMS
  };
}

// ===========
//   REDUCER
// ===========

export function widgets(
  state: IWidgetReducerState = defaultState,
  action: HashActions
): IWidgetReducerState {
  switch (action.type) {
    case UPSERT_ITEM:
      return {
        ...state,
        items: []
      };

    case UPSERT_ITEMS:
      return {
        ...state,
        items: []
      };

    case REMOVE_ITEM:
      return {
        ...state,
        items: []
      };

    case REMOVE_ITEMS:
      return {
        ...state,
        items: []
      };

    case GET_ITEMS:
      return {
        ...state,
        items: []
      };
  }
  return state;
}
