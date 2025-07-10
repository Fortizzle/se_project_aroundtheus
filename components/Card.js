export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._deleteButton.addEventListener("click", () => {
      this._element.remove();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }
  getData() {
    return { name: this._name, link: this._link };
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
