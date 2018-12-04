import store from "store/dist/store.modern";

const getFromLocalStorage = reduxStore => next => action => {
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

export default getFromLocalStorage;
