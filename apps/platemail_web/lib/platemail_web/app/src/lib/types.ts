// Flux Standard Action

export interface IAction {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: object;
}
