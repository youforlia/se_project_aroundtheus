export default class Api {
  constructor({ baseUrl, headers }) {
    // Constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  _request(url, options) {
    return fetch(url, options)
    .then(this._handleResponse);
  }


  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  // FETCH INITIAL CARDS  
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { 
      headers: this._headers,
    });
  }

  // FETCH CURRENT USER INFO  
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  // UPDATE USER INFO
  updateUserInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    });
  }

  // ADD NEW CARD
  addNewCard(name, link) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      }),
    });
  }

  // DELETE CARD
  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

// TOGGLE LIKE/DISLIKE CARD
  toggleLikeCard(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    });
  }

  // UPDATE AVATAR
  updateAvatar(link) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    });
  }

  //LOAD PAGE
  loadPage() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  }
