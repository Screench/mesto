export class Card {
  constructor(data, userId, templateSelector, handleImageClick, handleCardDelete, handleCardLike, handleCardDeleteLike) {
    this._name = card.name;
    this._link = card.link;
    this._dataLikes = data.likes;
    this._idCard = data._id;
    this.cardData = data;
    this._idUserCard = data.owner._id;
    this._likesCounter = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardDelete = handleCardDelete;
    this._putLike = handleCardLike;
    this._removeLike = handleCardDeleteLike;
    this._userId = userId;
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

    this._cardElementLikesCount = this.cardElement.querySelector('.element__span'); //
    
    this._cardElementTitle.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;

    this.renderCardLike(this.cardData);

    if (this._idUserCard !== this._userId) {
      this._cardElementDelete.remove();
    }

    this._setEventListeners();

    return this._cardElement;
  };

  _likeCard() {
    return this._dataLikes.some(like => like._id === this._userId) //this._cardElementLike.classList.toggle('element__heart-btn_active');
  };

  toggleLike() {
    if (this._likeCard()) {
      this._removeLike(this._idCard);
    } else {
      this._putLike(this.idCard);
    }
  }

renderCardLike(card) {
  this._dataLikes = card.likes;
  if (this._dataLikes.length === 0) {
    this._cardElementLikesCount.textContent = '0';

  } else {
    this._cardElementLikesCount.textContent = this._dataLikes.length
  }
  if (this.likedCard()) {
    this._cardElementLike.classList.add('element__button_active')
  } else {
    this._cardElementLike.classList.remove('element__button_active');
  }
}


  _removeCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._cardElementLike.addEventListener('click', () => this._toggleLike());
    this._cardElementDelete.addEventListener('click', () => this._handleCardDelete(this, this.idCard));
    this._cardElementImage.addEventListener('click', () => this._handleImageClick());
  };
}

