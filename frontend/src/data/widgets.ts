import makeCrudReducer from "./crud";
import withResetState from "./withResetState";

// =========
//   TYPES
// =========

export interface IWidget {
  content: string | null;
  id: number | undefined;
  title: string | null;
  user_id: number | null | undefined;
}

// ===========
//   REDUCER
// ===========

export const widgets = withResetState({ items: [] }, "SIGN_OUT")(
  makeCrudReducer("WIDGET")
);
