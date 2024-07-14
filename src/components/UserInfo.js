export default class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._imageElement = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._imageElement.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (about) {
      this._jobElement.textContent = about;
    }
    if (avatar) {
      this._imageElement.src = avatar;
    }
  }
}
