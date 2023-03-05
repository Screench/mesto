

///////////////////////////Проектная работа №4 (Попап редактирование профиля)///////////////////////////
const editButton = document.querySelector('.profile__edit-btn');      //Кнопка Редактировать
const closeButtonOnProfileEdit = document.querySelector('.popup_type_profile .popup__close-btn');                          //Кнопка Закрыть
const popupProfile = document.querySelector('.popup_type_profile');                       //Находим попап профиля в DOM

// Находим поля формы профиля в DOM
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_occupation');
const placeInput = document.querySelector('.popup__input_field_name');

// Находим элементы, куда должны быть вставлены значения полей
const existingUserName = document.querySelector('.profile__title');
const existingOccupation = document.querySelector('.profile__occupation');

const formProfile = document.querySelector('.profile-form');    // Находим форму профиля в DOM
editButton.addEventListener('click', editButtonFunctions);    //Слушатель к кнопке редактировать
closeButtonOnProfileEdit.addEventListener('click', () => closePopup(popupProfile));     //Слушатель к кнопке закрыть на профиле


//По кнопке Редактировать открываем попап и загружаем в инпуты текст из HTML. 
//Реализовано с помощью поочередного вызова соответствующих функций
function editButtonFunctions() {
  openPopup(popupProfile);
  updateInputsFromForm();
}

function updateInputsFromForm() {
  // Получите значение полей jobInput и nameInput из свойства value
  jobInput.value = existingOccupation.textContent;
  nameInput.value = existingUserName.textContent;
}

// Обработчик «отправки» формы профиля, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  existingUserName.textContent = nameInput.value; // Вставьте новые значения с помощью textContent
  existingOccupation.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
  closePopup(popupProfile); //Закрытие окна
}

// Прикрепляем обработчик к форме профиля:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleProfileFormSubmit);




///////////////////////////ПРОЕКТНАЯ РАБОТА №5. По заданиям:///////////////////////////
///////////////////////////1. Шесть карточек из "коробки"///////////////////////////
//Массив карточек вынесен в initialCards.js

initialCards.reverse(); //обращаем изначальный массив для его корректного отображения с помощью prepend.

const elements = document.querySelector('.elements');

initialCards.forEach(createCard);

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
  elements.prepend(newCard);
  //return newCard;
};




///////////////////////////2. Форма добавления карточки///////////////////////////

const addButton = document.querySelector('.profile__add-btn');        //Кнопка Добавить
const popupPlace = document.querySelector('.popup_type_place');       //Находим попап новой карточки в DOM
const closeButtonOnAddPlace = document.querySelector('.popup_type_place .popup__close-btn'); //Находим кнопку закрытия попапа новой карточки
const formPlace = document.querySelector('.place-form');              // Находим форму новой карточки в DOM
addButton.addEventListener('click', addButtonFunctions);            //Слушатель к кнопке добавить карточку
//Слушатель к кнопке закрыть на добавлении карточки
closeButtonOnAddPlace.addEventListener('click', () => closePopup(popupPlace));
//По кнопке "Добавить" открываем попап 
function addButtonFunctions() {
  formPlace.reset();
  openPopup(popupPlace);
}


///////////////////////////3. Добавление карточки///////////////////////////

formPlace.addEventListener('submit', handleFormSubmitPlace);    // Прикрепляем обработчик к форме новой карточки:

// Обработчик «отправки» формы новой карточки
function handleFormSubmitPlace(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = form.querySelector('.popup__input_field_place').value;
  const link = form.querySelector('.popup__input_field_link').value;
  const card = {
    name: name,
    link: link,
  }
  createCard(card);
  closePopup(popupPlace);
}

//Функция добавления попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

///////////////////////////4. Лайк карточки///////////////////////////
function handleLikeButtonClick(event) {
  // const likeBtn = event.target;
  event.target.classList.toggle('element__heart-btn_active');
};


///////////////////////////5. Удаление карточки///////////////////////////
function handleDeleteButtonClick(event) {
  const trashBtn = event.target;
  const element = trashBtn.closest('.element');
  element.remove();
}


///////////////////////////6. Открытие попапа с картинкой///////////////////////////
const popupImage = document.querySelector('.popup_type_image');
const enlargeImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');
function handleImageClick(event) {
  const bigImage = event.target;

  popupImageCaption.textContent = bigImage.name; ////Подпись к картинке попапа
  enlargeImage.alt = bigImage.alt;
  enlargeImage.src = bigImage.src;
  openPopup(popupImage);
}

const closeButtonOnPopupImage = document.querySelector('.popup_type_image .popup__close-btn');
closeButtonOnPopupImage.addEventListener('click', () => closePopup(popupImage));

///////////////////////////7. Плавное открытие и закрытие попапов///////////////////////////
//Реализовано в CSS
