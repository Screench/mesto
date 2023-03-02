///////////////////////////Проектная работа №4 (Попап редактирование профиля)///////////////////////////
let editButton = document.querySelector('.profile__edit-btn');      //Кнопка Редактировать
let closeButton = document.querySelector('.popup__close-btn');                          //Кнопка Закрыть
let popupProfile = document.querySelector('.popup_type_profile');                       //Находим попап профиля в DOM

// Находим поля формы профиля в DOM
let nameInput = document.querySelector('.popup__input_field_name');
let jobInput = document.querySelector('.popup__input_field_occupation');
let placeInput = document.querySelector('.popup__input_field_name');

// Находим элементы, куда должны быть вставлены значения полей
let existingUserName = document.querySelector('.profile__title');
let existingOccupation = document.querySelector('.profile__occupation');

let formElement = document.querySelector('.profile-form');    // Находим форму профиля в DOM
editButton.addEventListener('click', editButtonFunctions);    //Слушатель к кнопке редактировать
closeButton.addEventListener('click', popupProfileToggle);    //Слушатель к кнопке закрыть на профиле

//Открытие и закрытие Попапа с профилем
function popupProfileToggle() {
  popupProfile.classList.toggle('popup_opened');
}

//По кнопке Редактировать открываем попап и загружаем в инпуты текст из HTML. 
//Реализовано с помощью поочередного вызова соответствующих функций
function editButtonFunctions() {
  popupProfileToggle();
  updateInputsFromForm();
}

function updateInputsFromForm() {
  // Получите значение полей jobInput и nameInput из свойства value
  jobInput.value = existingOccupation.textContent;
  nameInput.value = existingUserName.textContent;
}

// Обработчик «отправки» формы профиля, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  existingUserName.textContent = nameInput.value; // Вставьте новые значения с помощью textContent
  existingOccupation.textContent = jobInput.value;// Вставьте новые значения с помощью textContent
  popupProfileToggle(); //Закрытие окна
}

// Прикрепляем обработчик к форме профиля:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);




///////////////////////////ПРОЕКТНАЯ РАБОТА №5. По заданиям:///////////////////////////
///////////////////////////1. Шесть карточек из "коробки"///////////////////////////
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.reverse();

const elements = document.querySelector('.elements');

initialCards.forEach(createCard);

function createCard(card) {
  const newCard = document.querySelector('.cardTemplate').content.cloneNode(true);
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
};



///////////////////////////2. Форма добавления карточки///////////////////////////

let addButton = document.querySelector('.profile__add-btn');        //Кнопка Добавить
let popupPlace = document.querySelector('.popup_type_place');       //Находим попап новой карточки в DOM
let closeButtonOnAddPlace = document.querySelector('.popup_type_place .popup__close-btn'); //Находим кнопку закрытия попапа новой карточки
let formPlace = document.querySelector('.place-form');              // Находим форму новой карточки в DOM
addButton.addEventListener('click', addButtonFunctions);            //Слушатель к кнопке добавить карточку
closeButtonOnAddPlace.addEventListener('click', popupPlaceToggle);  //Слушатель к кнопке закрыть на добавлении карточки

//По кнопке "Добавить" открываем попап 
function addButtonFunctions() {
  formPlace.reset();
  popupPlaceToggle();
}

function popupPlaceToggle() {
  popupPlace.classList.toggle('popup_opened');
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
  popupPlaceToggle(); 
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
function handleImageClick(event) {
const bigImage = event.target;
const caption = document.querySelector('.popup__caption');
caption.textContent = bigImage.name; ////Подпись к картинке попапа
enlargeImage.alt = bigImage.alt;
enlargeImage.src = bigImage.src;
popupImageToggle();
}

function popupImageToggle() {
  popupImage.classList.toggle('popup_opened');
}

const closeButtonOnPopupImage = document.querySelector('.popup_type_image .popup__close-btn');
closeButtonOnPopupImage.addEventListener('click', popupImageToggle);


///////////////////////////7. Плавное открытие и закрытие попапов///////////////////////////
//Реализовано в CSS