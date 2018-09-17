const baseURL = "http://localhost:4000/api/v1";

const api = {
  get: (path: string): Promise<object> => {
    const url = baseURL + path;

    return fetch(url).then(
      (response: Response): object => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }

        return response.json();
      }
    );
  }
};

export default api;
