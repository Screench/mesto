class Api {
  constructor(conf) {
    this._url = conf.url;
    this._headers = conf.headers;
    this._authorization = conf.headers['authorization'];

  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _getServerCards(){
    return fetch(`${this._url}/cards`, {headers: {authorization: this._authorization}})
    .then(response => this._checkResponse(response))
  }



  _addNewCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST', 
      headers: this._headers, 
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
    .then(response => this._checkResponse(response))
  };

  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      },

    })
    .then(response => this._checkResponse(response));
  }

  setUserInfoApi(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
    .then(response => this._checkResponse(response))
  }

  setUserAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),

    })
    .then (response => this._checkResponse(response))
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._headers,
    })
    .then(response => this._checkResponse(response))
  }

  putCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(response => this._checkResponse(response))
  }

  deleteCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then (response => this._checkResponse(response))
  }



}

export {Api}