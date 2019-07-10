import { BASE_API_URL, BASE_URL } from "./constants";

function __jsonify(res) {
  return res.json();
}

function __identity(input) {
  return input;
}

function __makeHeaders(method, opts) {
  if (opts.headers) {
    return opts.headers;
  }

  let headers: object = {
    Authorization: opts.token ? `Bearer ${opts.token}` : null,
    "Content-Type": "application/json"
  };

  if (method === "DELETE") {
    headers = {
      Authorization: opts.token ? `Bearer ${opts.token}` : null
    };
  }

  return headers;
}

function __makeBody(method, params) {
  return method === "DELETE" || method === "GET"
    ? null
    : JSON.stringify(params);
}

function __getDefaultCb(method, opts) {
  if (opts.callback) {
    return opts.callback;
  }

  return method === "DELETE" ? __identity : __jsonify;
}

async function __checkStatus(res, resHandler) {
  const jsonRes = await resHandler(res);

  if (res.status === 401 || res.status === 403) {
    throw new Error(jsonRes.error_message || "unauthorized");
  }

  if (res.status >= 400) {
    throw new Error(jsonRes.error_message || "error");
  }

  return jsonRes;
}

function __makeURL(path: string, opts: any): string {
  return opts.useNonApi ? BASE_URL + path : BASE_API_URL + path;
}

function __baseCall(
  method: string,
  endpoint: string,
  params: object = {},
  opts: object = { useNonApi: false }
) {
  const body = __makeBody(method, params);
  const headers = __makeHeaders(method, opts);
  const onReturn = __getDefaultCb(method, opts);

  return fetch(endpoint, {
    body,
    headers,
    method
  }).then(res => __checkStatus(res, onReturn));
}

const api = {
  get: (
    path: string,
    params = {},
    opts: object = { useNonApi: false }
  ): Promise<object> => {
    const query = new URLSearchParams();

    Object.keys(params).forEach(key => {
      query.append(key, params[key]);
    });

    const queryString = query.toString();

    let url = __makeURL(path, opts);
    if (queryString) {
      url = url + `?${queryString}`;
    }

    return __baseCall("GET", url, {}, opts);
  },

  post: (
    path: string,
    params: object,
    opts: object = { useNonApi: false }
  ): Promise<object> => {
    const url = __makeURL(path, opts);
    return __baseCall("POST", url, params, opts);
  },

  put: (
    path: string,
    params: object,
    opts: object = { useNonApi: false }
  ): Promise<object> => {
    const url = __makeURL(path, opts);
    return __baseCall("PUT", url, params, opts);
  },

  delete: (
    path: string,
    opts: object = { useNonApi: false }
  ): Promise<object> => {
    const url = __makeURL(path, opts);
    return __baseCall("DELETE", url, {}, opts);
  }
};

export default api;
