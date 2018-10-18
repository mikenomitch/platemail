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
  const hasAsyncFunction = typeof action.withLocalStorageData === "function";

  if (hasLocalKey && hasAsyncFunction) {
    const getVal = JSON.parse(store.get(action.localStorageKey));
    action.withLocalStorageData(getVal);
  }

  return next(action);
};

export default withLocalStorage;
