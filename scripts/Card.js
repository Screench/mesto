class Card {
  constructor(card, templateSelector, handleImageClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElementTitle = this._cardElement.querySelector('.element__title');
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    this._cardElementDelete = this._cardElement.querySelector('.element__trash-btn');
    this._cardElementLike = this._cardElement.querySelector('.element__heart-btn');
    
    this._cardElementTitle = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;
  
    this._setEventListeners();
  }

    /** Функция лайк-дизлайка карточки */
    _likeCard() {
      this._cardElementLike.classList.toggle('element__heart-btn_active');
    };
  
    /** Функция удаления карточки */
    _deleteCard() {
      this._cardElement.remove();
      this._cardElement = null;
    };
  
    /**Слушатели событий */
    _setEventListeners() {
      this._cardElementLike.addEventListener('click', () => this._likeCard());
      this._cardElementDelete.addEventListener('click', () => this._deleteCard());
      // this._cardElementImage.addEventListener('click', () =>
      //   this.handleImageClick({
      //     link: this._link,
      //     name: this._name,
      //   }));
    };

}




export {Card};
// //Создание карточки Места
// function createCard(card) {
//   const newCard = cardTemplate.cloneNode(true);
//   const cardHeading = newCard.querySelector('.element__title');
//   const cardImage = newCard.querySelector('.element__image')
//   const deleteButton = newCard.querySelector('.element__trash-btn');
//   const likeButton = newCard.querySelector('.element__heart-btn');
//   likeButton.addEventListener('click', handleLikeButtonClick);
//   deleteButton.addEventListener('click', handleDeleteButtonClick);
//   cardHeading.textContent = card.name;
//   cardImage.setAttribute('src', card.link);
//   cardImage.setAttribute('name', card.name);
//   cardImage.setAttribute('alt', card.name)
//   cardImage.addEventListener('click', () => handleImageClick(card));
//   return newCard;
// };

// //Добавление карточек
// const cardTemplate = document.querySelector('.cardTemplate').content.querySelector('.element');     //Находим шаблон для карточек
// const elements = document.querySelector('.elements');                                               //Элемент, куда положим карточки

// //Лайк карточки
// function handleLikeButtonClick(event) {
//   event.target.classList.toggle('element__heart-btn_active');
// };

// //Удаление карточки
// function handleDeleteButtonClick(event) {
//   const trashBtn = event.target;
//   const element = trashBtn.closest('.element');
//   element.remove();
// }