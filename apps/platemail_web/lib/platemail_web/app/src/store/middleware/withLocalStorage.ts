import merge from "lodash/merge";
import store from "store/dist/store.modern";

const withLocalStorage = reduxStore => next => action => {
  // SETTING
  const hasLocalStorateData = action.localStorageData;

  if (hasLocalStorateData) {
    Object.keys(action.localStorageData).forEach(k => {
      const v = action.localStorageData[k];
      store.set(k, JSON.stringify(v));
    });
  }

  // GETTING
  const hasLocalKey = action.localStorageKey;
  if (hasLocalKey) {
    const storedAuth = store.get(action.localStorageKey) || "{}";
    const val = JSON.parse(storedAuth);

    const actionWithReplacedPayload = merge(action, { payload: val });
    return next(actionWithReplacedPayload);
  }

  return next(action);
};

export default withLocalStorage;
