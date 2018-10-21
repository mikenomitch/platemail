import store from "store/dist/store.modern";

const withLocalStorage = reduxStore => next => action => {
  // SETTING
  const hasLocalStorateData = action.localStorageData;

  if (hasLocalStorateData) {
    Object.keys(action.localStorageData).forEach(k => {
      console.log("k", k);
      const v = action.localStorageData[k];

      if (v) {
        store.set(k, JSON.stringify(v));
      } else {
        store.remove(k);
      }
    });
  }

  // GETTING
  const hasLocalKey = action.localStorageKey;
  if (hasLocalKey) {
    const storedAuth = store.get(action.localStorageKey) || "{}";
    const val = JSON.parse(storedAuth);

    const actionWithReplacedPayload = Object.assign({}, action, {
      payload: val
    });
    return next(actionWithReplacedPayload);
  }

  return next(action);
};

export default withLocalStorage;
