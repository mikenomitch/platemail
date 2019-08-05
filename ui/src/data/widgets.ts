import makeCrudReducer from "./crud";
import withResetState from "./withResetState";

// =========
//   TYPES
// =========

export interface IWidget {
  content: string | null;
  id: number;
  title: string | null;
  user_id: number | null | undefined;
}

export interface IState {
  items: ReadonlyArray<IWidget>;
}

// ===========
//   REDUCER
// ===========

const resetState: IState = { items: [] };
export const widgets = withResetState(resetState, "SIGN_OUT")(
  makeCrudReducer("WIDGET")
);
