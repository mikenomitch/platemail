// =======
//   API
// =======

/* tslint:disable */
const env = window["useRuntimeEnv"] ? window["runtimeEnv"] : process.env;
/* tslint:enable */

export const API_PORT = env.API_PORT ? `:${env.API_PORT}` : "";
export const BASE_URL = `http://${env.API_HOST}${API_PORT}`;
export const BASE_API_URL = `${BASE_URL}/api/v1`;
export const BASE_SOCKET_URL = `ws://${env.API_HOST}${API_PORT}/socket`;
export const DSN = env.DSN;
