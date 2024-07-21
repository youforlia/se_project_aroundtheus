export default class Card {
  constructor({ name, link, _id, isLiked }, cardSelector, handleCardClick, handleDeleteCard, handleLikeCard ) {
    this.id = _id;
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._cardSelector = cardSelector;
    this._handleLikeCard = handleLikeCard;

    this._cardElement = null; // Initialize _cardElement
    // this.getView();
    // this._setEventListeners();
  }


  _setEventListeners() {
    // Ensure _cardElement is defined before adding event listeners
    if (!this._cardElement) return;

    // Card like button
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeCard(this);
      });

    // Card delete button
    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });

    // Open image preview
    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  updateLikeValue(isLiked) {
    this._isLiked = isLiked;
    this._updateLikeButton();
  }

  getIsLiked() {
    return this._isLiked;
  }

  getId() {
    return this.id;
  }

  deleteCard() {
    this._cardElement.remove();
    this._element = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__content")
      .cloneNode(true);

    this._cardElement.querySelector(".cards__image").src = this._link;
    this._cardElement.querySelector(".cards__title").innerText = this._name;
    this._cardElement.querySelector(".cards__image").alt = this._name;

    // Update the like button state based on the initial like state
    this._updateLikeButton();

    return this._cardElement;
  }
}
