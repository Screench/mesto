import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {initialCards, formValidationConfig} from '../components/utils.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

import '../pages/index.css';

//Попап редактирования Профиля
const popupProfile = document.querySelector('.popup_type_profile');                      //Находим попап Профиля в DOM
const popupOpenEdit = document.querySelector('.profile__edit-btn');                         //Кнопка Редактировать Профиль
const inputNameFormProfile = document.querySelector('.popup__input_field_name');                    //Находим поле Профиля с именем
const inputJobFormProfile = document.querySelector('.popup__input_field_job');                      //Находим поле Профиля с родом занятий
const formProfile = document.querySelector('.profile-form');                             //Находим форму popup изменения профиля
const existingUserName = document.querySelector('.profile__title');                      //Находим элементы, куда будут вставлены значения полей
const existingOccupation = document.querySelector('.profile__occupation');               //Находим элементы, куда будут вставлены значения полей

//Попап Нового Места
const popupPlace = document.querySelector('.popup_type_place');                          // Найти popup редактирования карточек
const popupOpenAdd = document.querySelector('.profile__add-btn');                           // Найти кнопку открытия редактирования карточек
const formPlace = document.querySelector('.place-form');                                 // Найти форму popup изменения карточек
const inputTitleFormPlace = document.querySelector('.popup__input_field_title');             // Найти поле ввода - название региона в форме добавления карточки
const inputLinkFormPlace = document.querySelector('.popup__input_field_link');               // Найти поле ввода - ссылки на фото в форме добавления карточки

//Попап с Картинкой
const popupImage = document.querySelector('.popup_type_image');                          //Находим Попап с картинкой
const enlargedImage = document.querySelector('.popup__image');                           //Сама картинка в попапе
const popupImageCaption = document.querySelector('.popup__caption');                     //Подпись к картинке попапа

//Кнопки закрытия попапа
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');                   // Найти все кнопки закрытия попапов

//Определяем границы попапов
const popups = document.querySelectorAll('.popup');                                  


const cardImagePopup = new PopupWithImage(popupPlace);

//Функция создания карточки
const createCard = (cardData) => {
  const card = new Card(cardData, '.cardTemplate', () => {
    cardImagePopup.open(cardData);
  });
  return card.generateCard();
};


const cardsContainer = new Section({
  renderer: (card) => {
    cardsContainer.addItem(createCard(card));
  }
}, '.elements');


//рендер карточек
cardsContainer.renderItems(initialCards);

//получаем данные пользователя
const userInfo = new UserInfo({
  selectorUserName: '.profile__title';
  selectorUserOccupation: '.profile__occupation'
})




//Функция открытия просмотра изображения карточки
const handleImageClick = (cardImage) => {
  openPopup(popupImage);
  enlargedImage.alt = cardImage.name;
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

//По кнопке Редактировать открываем попап и загружаем в инпуты текст из HTML. 
popupOpenEdit.addEventListener('click', () => openPopupProfile());

const openPopupProfile = () => {
  openPopup(popupProfile);
  inputNameFormProfile.value = existingUserName.textContent;
  inputJobFormProfile.value = existingOccupation.textContent;
  validationFormProfile.clearValidationForm();
}

//Обработчик формы профиля
formProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  existingUserName.textContent = inputNameFormProfile.value;
  existingOccupation.textContent = inputJobFormProfile.value;
  closePopup(popupProfile);
});

//Закрытие всех Попапов при нажатии на кнопку
popupCloseButtons.forEach((item) => {
  item.addEventListener('click', (evt) => {
    const popupClosestCloseButton = popupAddClosest(evt);
    closePopup(popupClosestCloseButton);
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
popupOpenAdd.addEventListener('click', () => openPopupPlace());

const openPopupPlace = () => {
  openPopup(popupPlace);
  formPlace.reset();
  validationFormPlace.clearValidationForm();
}

//Обработчик формы новой карточки
formPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();

  renderCard({
    name: inputTitleFormPlace.value,
    link: inputLinkFormPlace.value,
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
