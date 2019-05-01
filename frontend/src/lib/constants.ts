// =======
//   API
// =======

console.log("HEY");
console.log("THIS IS env:", process.env);
console.log("THIS IS FOO:", process.env.FOO);
console.log("THIS IS REACT_APP_FOO:", process.env.REACT_APP_FOO);

export const API_PORT = process.env.API_PORT ? `:${process.env.API_PORT}` : "";
export const BASE_URL = `http://${process.env.API_HOST}${API_PORT}`;
export const BASE_API_URL = `${BASE_URL}/api/v1`;
export const BASE_SOCKET_URL = `ws://${process.env.API_HOST}${API_PORT}/socket`;
