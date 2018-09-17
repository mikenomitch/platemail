const baseURL = "http://localhost:4000/api/v1";

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
    Authorization: `Bearer ${opts.token}`,
    "Content-Type": "application/json"
  };

  if (method === "DELETE" || method === "GET") {
    headers = {
      Authorization: `Bearer ${opts.token}`
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

function __checkStatus(res) {
  if (res.status === 401 || res.status === 403) {
    throw new Error("unauthorized");
  }

  if (res.status >= 400) {
    throw new Error("error");
  }

  return res;
}

function __baseCall(
  method: string,
  endpoint: string,
  params: object = {},
  opts: object = {}
) {
  const body = __makeBody(method, params);
  const headers = __makeHeaders(method, opts);
  const onReturn = __getDefaultCb(method, opts);

  return fetch(endpoint, {
    body,
    headers,
    method
  })
    .then(__checkStatus)
    .then(onReturn);
}

const api = {
  delete: (path: string): Promise<object> => {
    const url = baseURL + path;
    return __baseCall("DELETE", url);
  },
  get: (path: string): Promise<object> => {
    const url = baseURL + path;
    return __baseCall("GET", url);
  },
  post: (path: string, params: object, opts = {}): Promise<object> => {
    const url = baseURL + path;
    return __baseCall("POST", url, params, opts);
  },
  put: (path: string, params: object, opts = {}): Promise<object> => {
    const url = baseURL + path;
    return __baseCall("PUT", url, params, opts);
  }
};

export default api;
