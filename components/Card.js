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
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
    // console.log(this._cardElement);
  }

  _handleDeleteIcon() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    // this._setEventListeners();

    // this._cardImageEl = this._cardElement.querySelector(".card__image");
    // this._cardTitleEl = this._cardElement.querySelector(".card__title");
    // this._cardImageSrc.src = this._link;
    // this._cardImageEl.alt = this._name;
    // this._setEventListeners();
    // this._cardTitleEl.textContent = this._name;

    // return this._cardElement;
  }
}
