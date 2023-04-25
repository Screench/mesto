export class Card {
  constructor(card, templateSelector, handleImageClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    this._cardElementDelete = this._cardElement.querySelector('.element__trash-btn');
    this._cardElementLike = this._cardElement.querySelector('.element__heart-btn');
    
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  };

  _likeCard() {
    this._cardElementLike.classList.toggle('element__heart-btn_active');
  }

  _removeCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._likeCard());
    this._cardElementDelete.addEventListener('click', () => this._removeCard());
    this._cardElementImage.addEventListener('click', () =>
      this._handleImageClick({
        link: this._link,
        name: this._name,
      }));
  };
}

