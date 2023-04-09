import {FormValidator} from './FormValidator.js';
import {Card} from './Card.js';
import {initialCards, formValidationConfig} from './utils.js';

//Попап редактирования Профиля
const popupProfile = document.querySelector('.popup_type_profile');                      //Находим попап Профиля в DOM
const editButton = document.querySelector('.profile__edit-btn');                         //Кнопка Редактировать Профиль
const nameInput = document.querySelector('.popup__input_field_name');                    //Находим поле Профиля с именем
const jobInput = document.querySelector('.popup__input_field_job');                      //Находим поле Профиля с родом занятий
const formProfile = document.querySelector('.profile-form');                             //Находим форму popup изменения профиля
const existingUserName = document.querySelector('.profile__title');                      //Находим элементы, куда будут вставлены значения полей
const existingOccupation = document.querySelector('.profile__occupation');               //Находим элементы, куда будут вставлены значения полей


//Попап Нового Места
const popupPlace = document.querySelector('.popup_type_place');                          // Найти popup редактирования карточек
const addButton = document.querySelector('.profile__add-btn');                           // Найти кнопку открытия редактирования карточек
const formPlace = document.querySelector('.place-form');                                 // Найти форму popup изменения карточек
const inputFieldTitle = document.querySelector('.popup__input_field_title');             // Найти поле ввода - название региона в форме добавления карточки
const inputFieldLink = document.querySelector('.popup__input_field_link');               // Найти поле ввода - ссылки на фото в форме добавления карточки

//Попап с Картинкой
const popupImage = document.querySelector('.popup_type_image');                          //Находим Попап с картинкой
const enlargedImage = document.querySelector('.popup__image');                           //Сама картинка в попапе
const popupImageCaption = document.querySelector('.popup__caption');                     //Подпись к картинке попапа

//Кнопки закрытия попапа
const popupCloseList = document.querySelectorAll('.popup__close-btn');                   // Найти все кнопки закрытия попапов

//Определяем границы попапов
const popups = document.querySelectorAll('.popup');                                  

//Добавление карточек
const cardsContainer = document.querySelector('.elements');                                //Элемент, куда положим карточки



//Функция создания карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '.cardTemplate', handleImageClick);
  return card.generateCard();
};

//Функция открытия просмотра изображения карточки
const handleImageClick = (cardImage) => {
  openPopup(popupImage);

  enlargedImage.src = cardImage.link;
  popupImageCaption.textContent = cardImage.name;
}

//Вставка начальных карточек в DOM
initialCards.forEach((cardData) => {
  cardsContainer.append(createCard(cardData));
});

//Открытие попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClosePopup);
};

//Закрытие попапов
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', handleEscClosePopup);
};

//Закрытие по клавише Эскейп
const handleEscClosePopup = (evt) => {
  if (evt.key === 'Escape') {
    const popupClose = document.querySelector('.popup_opened');
    closePopup(popupClose);
  };
};

//Функция открытия Popup редактирования профиля c указанными на странице данными
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInput.value = existingUserName.textContent;
  jobInput.value = existingOccupation.textContent;
  validationFormProfile.clearValidationForm();
});

//Обработчик формы профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  existingUserName.textContent = nameInput.value;
  existingOccupation.textContent = jobInput.value;
  closePopup(popupProfile);
});

//Закрытие всех Попапов при нажатии на крестик
popupCloseList.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCross = popupAddClosest(evt);
    closePopup(popupClosestCross);
  });
});

//Закрытие всех Попапов при нажатии на Оверлэй
popups.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(item);
    };
  });
});

//По кнопке "Добавить Место" открываем попап Места
addButton.addEventListener('click', () => {
  openPopup(popupPlace);
  inputFieldTitle.value = '';
  inputFieldLink.value = '';
  validationFormPlace.clearValidationForm();
});

//Обработчик формы новой карточки
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: inputFieldTitle.value,
    link: inputFieldLink.value,
  });

  evt.target.reset();
  closePopup(popupPlace);
});

//Создание нового места из формы Попапа Место
const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};

//Возвращение события
const popupAddClosest = (evt) => {
  return evt.target.closest('.popup');
};

//Валидация форм
const validationFormProfile = new FormValidator(formValidationConfig, formProfile);
validationFormProfile.enableValidation();

const validationFormPlace = new FormValidator(formValidationConfig, formPlace);
validationFormPlace.enableValidation();
