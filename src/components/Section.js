export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems(cardData) {
    cardData.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._containerElement.prepend(item);
  }
}
