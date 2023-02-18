//Кнопка Редактировать и слушатель к ней
let editButton = document.querySelector('.profile__edit-btn');
editButton.addEventListener('click', editButtonFunctions);

//Кнопка Закрыть и слушатель к ней
let closeButton = document.querySelector('.popup__close-btn');
closeButton.addEventListener('click', popupToggle);

//Кнопка Сохранить и слушатель к ней
let submitButton = document.querySelector('.popup__submit-btn');
submitButton.addEventListener('submit', handleFormSubmit);

//Открытие и закрытие Попапа
function popupToggle() {
  let popup = document.querySelector('.popup');
  popup.classList.toggle('popup__opened');
}

// Находим форму в DOM
let formElement = document.querySelector('form');

//По кнопке Редактировать открываем попап и загружаем в инпуты текст из HTML. 
//Реализовано с помощью поочередного вызова соответствующих функций
function editButtonFunctions() {
  popupToggle();
  updateInputsFromForm();
}

function updateInputsFromForm() {
  // Находим поля формы в DOM
  let nameInput = document.querySelector('.popup__input_name');
  let jobInput = document.querySelector('.popup__input_occupation');
  // Выберите элементы, куда должны быть вставлены значения полей
  let existingUserName = document.querySelector('.profile__title');
  let existingOccupation = document.querySelector('.profile__occupation');
  // Получите значение полей jobInput и nameInput из свойства value
  jobInput.value = existingOccupation.textContent;
  nameInput.value = existingUserName.textContent;
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  // Находим поля формы в DOM
  let nameInput = document.querySelector('.popup__input_name');
  let jobInput = document.querySelector('.popup__input_occupation');
  // Выберите элементы, куда должны быть вставлены значения полей
  let existingUserName = document.querySelector('.profile__title');
  let existingOccupation = document.querySelector('.profile__occupation');
  // Вставьте новые значения с помощью textContent
  existingUserName.textContent = nameInput.value;
  existingOccupation.textContent = jobInput.value;
  //Закрытие окна
  popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);