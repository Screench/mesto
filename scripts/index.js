//Объект валидации
const objectValidation = {
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
}

//Попап редактирования Профиля
const popupProfile = document.querySelector('.popup_type_profile');                                 //Находим попап Профиля в DOM
const editButton = document.querySelector('.profile__edit-btn');                                    //Кнопка Редактировать Профиль
const buttonClosePopupProfile = document.querySelector('.popup_type_profile .popup__close-btn');    //Кнопка Закрыть Профиль
const nameInput = document.querySelector('.popup__input_field_name');                               //Находим поле Профиля с именем
const jobInput = document.querySelector('.popup__input_field_job');                                 //Находим поле Профиля с родом занятий
const formProfile = document.querySelector('.profile-form');                                        //Находим форму Профиля
const existingUserName = document.querySelector('.profile__title');                                 //Находим элементы, куда будут вставлены значения полей
const existingOccupation = document.querySelector('.profile__occupation');                          //Находим элементы, куда будут вставлены значения полей

//Попап Нового Места
const popupPlace = document.querySelector('.popup_type_place');                                     //Находим попап Места
const addButton = document.querySelector('.profile__add-btn');                                      //Кнопка Добавить Место
const buttonClosePopupPlace = document.querySelector('.popup_type_place .popup__close-btn');        //Кнопка закрыть Место
const formPlace = document.querySelector('.place-form');                                            //Находим форму Места
const inputFieldTitle = document.querySelector('.popup__input_field_title');                        //Находим значения заголовка Места
const inputFieldLink = document.querySelector('.popup__input_field_link');                          //Находим значение поля с сылкой Места


//Попап с Картинкой
const popupImage = document.querySelector('.popup_type_image');                                     //Находим Попап с картинкой
const buttonClosePopupImage = document.querySelector('.popup_type_image .popup__close-btn');        //Кнопка закрытия Картинки
const enlargedImage = document.querySelector('.popup__image');                                      //Сама картинка в попапе
const popupImageCaption = document.querySelector('.popup__caption');                                //Подпись к картинке попапа



//Определяем границы попапов
const popupsClosest = document.querySelectorAll('.popup');

//Добавление карточек
const cardTemplate = document.querySelector('.cardTemplate').content.querySelector('.element');     //Находим шаблон для карточек
const elements = document.querySelector('.elements');                                               //Элемент, куда положим карточки

//Лайк карточки
function handleLikeButtonClick(event) {
  event.target.classList.toggle('element__heart-btn_active');
};

//Удаление карточки
function handleDeleteButtonClick(event) {
  const trashBtn = event.target;
  const element = trashBtn.closest('.element');
  element.remove();
}

//Создание карточки Места
function createCard(card) {
  const newCard = cardTemplate.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__title');
  const cardImage = newCard.querySelector('.element__image')
  const deleteButton = newCard.querySelector('.element__trash-btn');
  const likeButton = newCard.querySelector('.element__heart-btn');
  likeButton.addEventListener('click', handleLikeButtonClick);
  deleteButton.addEventListener('click', handleDeleteButtonClick);
  cardHeading.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('name', card.name);
  cardImage.setAttribute('alt', card.name)
  cardImage.addEventListener('click', () => handleImageClick(card));
  return newCard;
};

//Открытие попапа с картинкой
function handleImageClick(card) {
  openPopup(popupImage);
  enlargedImage.src = card.link;
  enlargedImage.alt = card.name;
  popupImageCaption.textContent = card.name;
};

//Вставка начальных карточек в DOM
initialCards.forEach((card) => {
  elements.append(createCard(card));
});


//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClosePopup);
}

//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClosePopup);
}

//Закрытие по клавише Эскейп
const handleEscClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupClose = document.querySelector('.popup_opened');
    closePopup(popupClose);
  };
};

//Сброс общих стилей при открытии Попапа
const resetValidationStyle = (popupName) => {
  disableSubmitInput(popupName);
  disableSubmitButton(popupName);
};

//Сброс полей при открытии попапа
const disableSubmitInput = (popupName) => {
  const inputList = popupName.querySelectorAll(objectValidation.inputSelector);
  inputList.forEach((input) => {
    input.classList.remove(objectValidation.inputErrorClass);
    input.nextElementSibling.textContent = '';
  });
}


//Сброс кнопки Submit
const disableSubmitButton = (popupName) => {
  const buttonSubmit = popupName.querySelector(objectValidation.submitButtonSelector);
    buttonSubmit.classList.add(objectValidation.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', '');
}

//По кнопке Редактировать открываем попап и загружаем в инпуты текст из HTML. 
function editButtonFunctions() {
  openPopup(popupProfile);
  updateInputsFromForm();
  resetValidationStyle(popupProfile);
}

// Получаем значение полей jobInput и nameInput из свойства value в форме профиля
function updateInputsFromForm() {
  jobInput.value = existingOccupation.textContent;
  nameInput.value = existingUserName.textContent;
}

// Обработчик формы профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  existingUserName.textContent = nameInput.value; // Вставляем новые значения с помощью textContent
  existingOccupation.textContent = jobInput.value;// Вставляем новые значения с помощью textContent
  closePopup(popupProfile); //Закрытие окна
}

//Закрытие всех Попапов при нажатии на Оверлэй
popupsClosest.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      const popupsClosestOverlay = getClosestPopup(evt);
      closePopup(popupsClosestOverlay);
    };
  });
});


//По кнопке "Добавить Место" открываем попап Места
function addButtonFunctions() {
  formPlace.reset();
  openPopup(popupPlace);
  resetValidationStyle(popupPlace);
}




// Обработчик формы новой карточки
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const form = evt.target;

  const card = {
    name: inputFieldTitle.value,
    link: inputFieldLink.value,
  }
  renderCard(card);
  closePopup(popupPlace);
}


//Создание нового места из формы Попапа Место
const renderCard = (card) => {
  elements.prepend(createCard(card));
};


//Возвращение события
const getClosestPopup = (evt) => {
  return evt.target.closest('.popup');
};






///////////////////////////ОБРАБОТЧИКИ СОБЫТИЙ///////////////////////////
formProfile.addEventListener('submit', handleProfileFormSubmit); // Обработчик к форме профиля

buttonClosePopupImage.addEventListener('click', () => closePopup(popupImage)); //Слушатель к кнопке закрыть на попапе с картинкой

editButton.addEventListener('click', editButtonFunctions);      //Слушатель к кнопке "редактировать профиль"
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupProfile));     //Слушатель к кнопке закрыть на профиле

//Форма добавления карточки
addButton.addEventListener('click', addButtonFunctions);            //Слушатель к кнопке "добавить Место"
buttonClosePopupPlace.addEventListener('click', () => closePopup(popupPlace)); //Слушатель к кнопке закрыть попапе Места
formPlace.addEventListener('submit', handleFormSubmitPlace);    // Прикрепляем обработчик к форме Места: