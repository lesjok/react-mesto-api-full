export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._errorHandler);
  }
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._errorHandler);
  }
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._errorHandler);
  }
  editUserInfo(item) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then(this._errorHandler);
  }
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }
  changeUserAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      }),
    }).then(this._errorHandler);
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._errorHandler);
  }
     else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._errorHandler);
    }
  }
}
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "546c3937-20fb-4281-b49f-cc46847c72d5",
    "Content-Type": "application/json",
  },
});
export default api;
