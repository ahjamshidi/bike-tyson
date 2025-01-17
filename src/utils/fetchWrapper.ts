export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

function get(url: string, headers: any = {}) {
  const requestOptions: any = {
    method: 'GET',
  };
  if (headers) requestOptions['headers'] = headers;
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: Object, headers: any = {}) {
  headers['Content-Type'] = 'application/json';
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: Object) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string, body: Object) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
