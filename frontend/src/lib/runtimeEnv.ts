/* tslint:disable */
const getFromEnv = key => {
  const env = window["useRuntimeEnv"] ? window["runtimeEnv"] : process.env;
  return env[key];
};

export const apiPort = () => getFromEnv("API_PORT");
export const apiHost = () => getFromEnv("API_HOST");
export const baseUrl = () => `http://${apiHost()}${apiPort()}`;
export const baseApiUrl = () => `${baseUrl()}/api/v1`;
export const baseSocketUrl = () => {
  const portString = apiPort() ? `:${apiPort()}` : "";
  return `ws://${apiHost()}${portString}/socket`;
};

console.log("runtime", window["useRuntimeEnv"]);
/* tslint:enable */
