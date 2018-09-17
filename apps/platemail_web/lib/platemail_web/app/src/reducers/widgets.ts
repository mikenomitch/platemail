// =========
//   TYPES
// =========

export interface IWidget {
  title: string | null;
  content: string | null;
  user_id: number | null;
}

export interface IWidgetReducerState {
  items: IWidget[];
}
export interface IUpsertItem {
  payload: IWidget;
  type: "UPSERT_ITEM";
}

export interface IUpsertItems {
  payload: IWidget[];
  type: "UPSERT_ITEMS";
}

export interface IRemoveItem {
  payload: number;
  type: "REMOVE_ITEM";
}

export interface IRemoveItems {
  payload: number[];
  type: "REMOVE_ITEMS";
}

export interface IGetItems {
  type: "GET_ITEMS";
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

export function upsertItem(item: IWidget): IUpsertItem {
  return {
    payload: item,
    type: "UPSERT_ITEM"
  };
}

export function upsertItems(items: IWidget[]): IUpsertItems {
  return {
    payload: items,
    type: "UPSERT_ITEMS"
  };
}

export function removeItem(id: number): IRemoveItem {
  return {
    payload: id,
    type: "REMOVE_ITEM"
  };
}

export function removeItems(ids: number[]): IRemoveItems {
  return {
    payload: ids,
    type: "REMOVE_ITEMS"
  };
}

export function getItems(): IGetItems {
  return {
    type: "GET_ITEMS"
  };
}

// ===========
//   REDUCER
// ===========

const defaultState = {
  items: []
};

export function widgets(
  state: IWidgetReducerState = defaultState,
  action: HashActions
): IWidgetReducerState {
  switch (action.type) {
    case "UPSERT_ITEM":
      return {
        ...state,
        items: []
      };

    case "UPSERT_ITEMS":
      return {
        ...state,
        items: action.payload || []
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: []
      };

    case "REMOVE_ITEMS":
      return {
        ...state,
        items: []
      };
  }
  return state;
}
