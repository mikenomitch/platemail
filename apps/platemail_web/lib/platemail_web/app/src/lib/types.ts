// Flux Standard Action plus extensions

export interface IAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: object;
  localStorageData?: object;
  localStorageKey?: string;
}
