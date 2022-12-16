class RegisterApi {
  constructor(options) {
    this._options = options;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(data) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: 'POST',
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify(data),    
    })
    .then(this._checkResponseStatus)
  }

  authorize(data) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: 'POST',
      headers: this._options.headers,
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(this._checkResponseStatus)
  }

  signOut() {
    return fetch(`${this._options.baseUrl}/signout`, {
      method: 'GET',
      headers: this._options.headers,
      credentials: 'include',
    })
    .then(this._checkResponseStatus)
  }

  getContent() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._checkResponseStatus)
  }

}

const registerApi = new RegisterApi({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'http://api.1149487-cj55507.tw1.ru',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default registerApi;