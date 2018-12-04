// =======
//   API
// =======

export const API_PORT = process.env.API_PORT ? `:${process.env.API_PORT}` : "";
export const BASE_URL = `http://${process.env.API_HOST}${API_PORT}`;
export const BASE_API_URL = `${BASE_URL}/api/v1`;
export const BASE_SOCKET_URL = `ws://${process.env.API_HOST}${API_PORT}/socket`;
