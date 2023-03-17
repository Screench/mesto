///////////////////////////ПЕРЕМЕННЫЕ///////////////////////////
const editButton = document.querySelector('.profile__edit-btn');                                    //Кнопка Редактировать
const closeButtonOnProfileEdit = document.querySelector('.popup_type_profile .popup__close-btn');   //Кнопка Закрыть Профиль
const popupProfile = document.querySelector('.popup_type_profile');                                 //Находим попап профиля в DOM

// Находим поля формы профиля в DOM
const nameInput = document.querySelector('.popup__input_field_name');
let jobInput = document.querySelector('.popup__input_field_occupation');
let placeInput = document.querySelector('.popup__input_field_name');

// Находим элементы, куда должны быть вставлены значения полей профиля
const existingUserName = document.querySelector('.profile__title');
const existingOccupation = document.querySelector('.profile__occupation');
const formProfile = document.querySelector('.profile-form');    // Находим форму профиля в DOM

const elements = document.querySelector('.elements');

const addButton = document.querySelector('.profile__add-btn');        //Кнопка Добавить карточку
const popupPlace = document.querySelector('.popup_type_place');       //Находим попап новой карточки в DOM
const closeButtonOnAddPlace = document.querySelector('.popup_type_place .popup__close-btn'); //Кнопка закрытия попапа новой карточки
const formPlace = document.querySelector('.place-form');              // Находим форму новой карточки в DOM

const popupImage = document.querySelector('.popup_type_image'); // Попап с картинкой
const enlargeImage = document.querySelector('.popup__image');  // Сама картинка в попапе
const popupImageCaption = document.querySelector('.popup__caption'); //Подпись к картинке попапа

const closeButtonOnPopupImage = document.querySelector('.popup_type_image .popup__close-btn'); //Кнопка закрытия на попапе с картинкой

const renderCard = (card) => {
  elements.prepend(createCard(card));
};

///////////////////////////ФУНКЦИИ///////////////////////////

//По кнопке Редактировать открываем попап и загружаем в инпуты текст из HTML. 
function editButtonFunctions() {
  openPopup(popupProfile);
  // updateInputsFromForm();
}

// Получаем значение полей jobInput и nameInput из свойства value в форме профиля
function updateInputsFromForm() {
  jobInput.value = existingOccupation.textContent;
  nameInput.value = existingUserName.textContent;
}

// Обработчик формы профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  existingUserName.textContent = nameInput.value; // Вставляем новые значения с помощью textContent
  existingOccupation.textContent = jobInput.value;// Вставляем новые значения с помощью textContent
  closePopup(popupProfile); //Закрытие окна
}

//По кнопке "Добавить новую карточку" открываем попап новой карточки
function addButtonFunctions() {
  formPlace.reset();
  openPopup(popupPlace);
}

//Создание карточки
function createCard(card) {
  const cardTemplate = document.querySelector('.cardTemplate').content;
  const newCard = cardTemplate.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__title');
  const cardImage = newCard.querySelector('.element__image')
  const deleteButton = newCard.querySelector('.element__trash-btn');
  const likeButton = newCard.querySelector('.element__heart-btn');
  cardImage.addEventListener('click', handleImageClick);
  likeButton.addEventListener('click', handleLikeButtonClick);
  deleteButton.addEventListener('click', handleDeleteButtonClick);
  cardHeading.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `Изображение ${card.name}`);
  cardImage.setAttribute('name', card.name);
  return newCard;
};

// Обработчик формы новой карточки
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = form.querySelector('.popup__input_field_place').value;
  const link = form.querySelector('.popup__input_field_link').value;
  const card = {
    name: name,
    link: link,
  }
  renderCard(card);
  closePopup(popupPlace);
}


//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Закрытие попапов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//Лайк карточки
function handleLikeButtonClick(event) {
  // const likeBtn = event.target;
  event.target.classList.toggle('element__heart-btn_active');
};


//Удаление карточки
function handleDeleteButtonClick(event) {
  const trashBtn = event.target;
  const element = trashBtn.closest('.element');
  element.remove();
}



//Открытие попапа с картинкой
function handleImageClick(event) {
  const bigImage = event.target;
  popupImageCaption.textContent = bigImage.name; ////Подпись к картинке попапа
  enlargeImage.alt = bigImage.alt;
  enlargeImage.src = bigImage.src;
  openPopup(popupImage);
}

//Вставка начальных карточек в DOM
initialCards.forEach((card) => {
  elements.append(createCard(card));
});


///////////////////////////ОБРАБОТЧИКИ СОБЫТИЙ///////////////////////////
formProfile.addEventListener('submit', handleFormProfileSubmit); // Обработчик к форме профиля:

closeButtonOnPopupImage.addEventListener('click', () => closePopup(popupImage)); //Слушатель к кнопке закрыть на попапе с картинкой

editButton.addEventListener('click', editButtonFunctions);      //Слушатель к кнопке "редактировать профиль"
closeButtonOnProfileEdit.addEventListener('click', () => closePopup(popupProfile));     //Слушатель к кнопке закрыть на профиле

//Форма добавления карточки
addButton.addEventListener('click', addButtonFunctions);            //Слушатель к кнопке "добавить карточку"
closeButtonOnAddPlace.addEventListener('click', () => closePopup(popupPlace)); //Слушатель к кнопке закрыть на добавлении карточки
formPlace.addEventListener('submit', handleFormSubmitPlace);    // Прикрепляем обработчик к форме новой карточки:




const showInputError = (errorTextElement, validationMessage) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
}

const hideInputError = () => {
  errorTextElement.classList.remove(activeErrorClass);
  errorTextElement.textContent = '';
}

const disableButton = (submitButton, disabledSubmitButtonClass) => {
  submitButton.classList.remove(disabledSubmitButtonClass);
  submitButton.disabled = false;
}

const enableButton = (submitButton, disabledSubmitButtonClass) => {
  submitButton.classList.add(disabledSubmitButtonClass);
  submitButton.disabled = true;
}
  
const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
 const errorTextElement = document.querySelector(`${errorClassTemplate}${inputSelector}`);
 console.log(inputSelector);
  if(!input.validity.valid) {
  showInputError(errorTextElement, input.validationMessage, activeErrorClass);
  
 } else {
  hideInputError(errorTextElement, activeErrorClass);
 }
}

const hasInvalidInput = () => {
  return Array.from(inputList).some((input) => !input.validity.valid);
}


const toggleButtonState = (submitButton, disabledSubmitButtonClass, inputList) => {
  if (!hasInvalidInput(inputList)) {
    enableButton(submitButton, disabledSubmitButtonClass);
  } else {
    disableButton(submitButton, disabledSubmitButtonClass);
  }

}
/////////////////////////////////////////////////////////////////
const setEventListeners = (form, inputList, { errorClassTemplate, activeErrorClass, disabledSubmitButtonClass }, submitButton) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
/////////////////////////////////////////////////////////////////////////////////

  inputList.forEach((input) => {
    input.addEventListener('input', (e) => {
      checkInputValidity(input, errorClassTemplate, activeErrorClass);
      toggleButtonState(submitButton, disabledSubmitButtonClass, inputList);
    });
  });
}


const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...config}) => {
  const form = document.querySelector(formSelector);
  const inputList = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  
  setEventListeners(form, inputList, config, submitButton);
}



enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClassTemplate: '.popup__input-error_type_',
  activeErrorClass: 'popup__input-error',
  submitButtonSelector: '.popup__submit-btn',
  disabledSubmitButtonClass:'popup__submit-btn_disabled',
});