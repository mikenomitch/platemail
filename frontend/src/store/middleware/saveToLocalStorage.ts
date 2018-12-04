import store from "store/dist/store.modern";

const saveToLocalStorage = reduxStore => next => action => {
  const hasLocalStorateData = action.localStorageData;

  if (hasLocalStorateData) {
    Object.keys(action.localStorageData).forEach(k => {
      const val = action.localStorageData[k];

      if (val) {
        store.set(k, JSON.stringify(val));
      } else {
        store.remove(k);
      }
    });
  }

  return next(action);
};

export default saveToLocalStorage;
