import Api from "./index.js";

class Api {
  //   constructor(options) {
  //     // Constructor body
  //     this._baseUrl = options.baseUrl;
  //     this._headers = options.headers;
  //   }

  getUserInfo() {
    return fetch(`${this._baseUrl}/user`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Function to fetch user info and cards together
  fetchData() {
    const userInfoPromise = this.getUserInfo();
    const cardsPromise = this.getCards();

    return Promise.all([userInfoPromise, cardsPromise]);
  }
}
