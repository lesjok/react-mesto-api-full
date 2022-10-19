class Api {
  constructor(options) {
    this._options = options;
  }
  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._errorHandler);
  }
  
  addCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      credentials: this._options.credentials,
      body: JSON.stringify(data)
    })
    .then(this._errorHandler);
  }
  getUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._errorHandler);
  }
  editUserInfo(item) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      credentials: this._options.credentials,
      body: JSON.stringify(item)
    })
    .then(this._errorHandler);
  }
  deleteCard(cardID) {
    return fetch(`${this._options.baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
    .then(this._errorHandler);
  }
  changeUserAvatar(item) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      credentials: this._options.credentials,
      body: JSON.stringify({
        avatar: item.avatar
      }),
    }).then(this._errorHandler);
  }
  changeLikeCardStatus(cardID, isLiked) {
    if (!isLiked) {
      return fetch(`${this._options.baseUrl}/cards/${cardID}/likes`, {
        method: 'PUT',
        headers: this._options.headers,
        credentials: 'include',
      })
      .then(this._errorHandler);
    } else {
      return fetch(`${this._options.baseUrl}/cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: this._options.headers,
        credentials: 'include',
      })
      .then(this._errorHandler);
    } 
  }
}
const api = new Api({
  baseUrl: 'https://api.react-mesto.nomoredomains.icu',
  headers: {
      'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default api;