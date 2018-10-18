// Flux Standard Action

export interface IAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: object;
  localStorageData?: object;
  withLocalStorageData?: (objectFromStorage: any) => any;
  localStorageKey?: string;
}
