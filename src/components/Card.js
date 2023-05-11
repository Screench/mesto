export class Card {
  constructor({
    data,
    userId,
    cardTemplateSelector,
    handleImageClick,
    handleCardRemove,
    handleCardSetLike,
    handleCardRemoveLike
  }) {
    this._name = data.name;
    this._link = data.link;
    this._dataLikes = data.likes;
    this.idCard = data._id;
    this.cardData = data;
    this._idUserCard = data.owner._id;
    this._likesCounter = data.likes.length;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardRemove = handleCardRemove;
    this._setLike = handleCardSetLike;
    this._removeLike = handleCardRemoveLike;
    this._userId = userId;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this.cardElement = this._getTemplate();
    this._cardTitle = this.cardElement.querySelector('.element__title');
    this._cardImage = this.cardElement.querySelector('.element__image');
    this._cardDelete = this.cardElement.querySelector('.element__trash-btn');
    this._cardLike = this.cardElement.querySelector('.element__heart-btn');
    this._cardCounter = this.cardElement.querySelector('.element__counter');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this.renderCardLike(this.cardData);

    if (this._idUserCard !== this._userId) {
      this._cardDelete.remove();
    }

    this._setEventListeners();

    return this.cardElement;
  };

  likeCard() {
    return this._dataLikes.some(like => like._id === this._userId)
  };

  toggleLike() {
    if (this.likeCard()) {
      this._removeLike(this.idCard);
    } else {
      this._setLike(this.idCard);
    }
  }

  renderCardLike(card) {
    this._dataLikes = card.likes;
    if (this._dataLikes.length === 0) {
      this._cardCounter.textContent = '0';
    } else {
      this._cardCounter.textContent = this._dataLikes.length
    }
    if (this.likeCard()) {
      this._cardLike.classList.add('element__heart-btn_active')
    } else {
      this._cardLike.classList.remove('element__heart-btn_active');
    }
  }


  deleteCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => this.toggleLike());
    this._cardDelete.addEventListener('click', () => this._handleCardRemove(this, this.idCard));
    this._cardImage.addEventListener('click', () => this._handleImageClick());
  };
}

