export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  //EVENT LISTENERS
  _setEventListeners() {
    //card like button
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this.handleLikeIcon();
      });

    //card delete button
    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIcon();
      });
  }

  //EVENT HANDLERS
  _handleLikeIcon() {
    this._cardElement
      .querySelector(".cardslike-button")
      .classList.toggle("cards__like-button_active");
  }

  _handleDeleteIcon() {
    this._cardElement.remove;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    this._setEventListeners();
  }
}
