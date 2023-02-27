//Кнопка Редактировать
let editButton = document.querySelector('.profile__edit-btn');
//Кнопка Закрыть
let closeButton = document.querySelector('.popup__close-btn');
//Находим попап в DOM
let popup = document.querySelector('.popup');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_field_name');
let jobInput = document.querySelector('.popup__input_field_occupation');
// Находим элементы, куда должны быть вставлены значения полей
let existingUserName = document.querySelector('.profile__title');
let existingOccupation = document.querySelector('.profile__occupation');
// Находим форму в DOM
let formElement = document.querySelector('form');

//Слушатель к кнопке редактировать
editButton.addEventListener('click', editButtonFunctions);
//Слушатель к кнопке закрыть
closeButton.addEventListener('click', popupToggle);

//Открытие и закрытие Попапа
function popupToggle() {
  popup.classList.toggle('popup_opened');
}

//По кнопке Редактировать открываем попап и загружаем в инпуты текст из HTML. 
//Реализовано с помощью поочередного вызова соответствующих функций
function editButtonFunctions() {
  popupToggle();
  updateInputsFromForm();
}

function updateInputsFromForm() {
  // Получите значение полей jobInput и nameInput из свойства value
  jobInput.value = existingOccupation.textContent;
  nameInput.value = existingUserName.textContent;
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 

  // Вставьте новые значения с помощью textContent
  existingUserName.textContent = nameInput.value;
  existingOccupation.textContent = jobInput.value;
  //Закрытие окна
  popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);



const cards = [
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

const elements = document.querySelector('.elements');

cards.forEach(function(card) {
  const newCard = document.querySelector('.cardTemplate').content.cloneNode(true);
  const cardHeading = newCard.querySelector('.element__title');
  const cardImage = newCard.querySelector('.element__image')
  cardHeading.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  elements.append(newCard);
});