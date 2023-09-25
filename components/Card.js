export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  //EVENT LISTENERS
  _setEventListeners() {
    //card like button
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //card delete button
    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });

    //open image preview
    this._cardElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  //EVENT HANDLERS
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__title").innerText = this._name;
    this._cardElement.querySelector(".cards__image").alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
