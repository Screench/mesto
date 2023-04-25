import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {initialCards, formValidationConfig} from '../components/utils.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import '../pages/index.css';

const popupImageSelector = '.popup_type_image';
const popupProfileSelector = '.popup_type_profile';
const popupPlaceSelector = '.popup_type_place';
const cardElementsSelector = '.elements'; 
const cardTemplateSelector = '.cardTemplate';
const userNameSelector = '.profile__title';
const userOccupationSelector = '.profile__occupation';
const formProfileSelector = 'profile-form';
const formPlaceSelector = 'place-form';
const popupOpenEdit = document.querySelector('.profile__edit-btn');  //Кнопка чтобы Редактировать Профиль
const popupOpenAdd = document.querySelector('.profile__add-btn');    //Кнопка чтобы Добавить Место
const popupWithImage = new PopupWithImage(popupImageSelector);

//создать секцию
const cardsContainer = new Section({
  renderer: (card) => {
    cardsContainer.addItem(createCard(card));
  },
}, cardElementsSelector
);

//создать карточку
const createCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, () => {
    popupWithImage.open(cardData);
  });

  return card.generateCard();
}

//вставить начальные карточки
cardsContainer.renderItems(initialCards.reverse());


//получить данные пользователя
const userInfo = new UserInfo({
  userNameSelector,
  userOccupationSelector
})

//создать попап профиля
const popupWithFormProfile = new PopupWithForm(popupProfileSelector, {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
  }
})

//открыть попап профиля
popupOpenEdit.addEventListener('click', () => {
  popupWithFormProfile.open();
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  validatorForms[formProfileSelector].clearValidationForm();
});

//создать попап места
const popupWithFormPlace = new PopupWithForm(popupPlaceSelector, {
  submitCallback: ( {link, title:name} ) => {
    cardsContainer.addItem(createCard({
      name,
      link,
      alt: name
    }))
  }
})

//открыть попап места
popupOpenAdd.addEventListener('click', () => {
  popupWithFormPlace.open();
  validatorForms[formPlaceSelector].clearValidationForm();
});


//валидация
const validatorForms = {};

const enableValidation = (data) => {
  const listForm = Array.from(document.querySelectorAll(data.formSelector))
  listForm.forEach((formElement) => {
    const formValidator = new FormValidator(data, formElement);
    const formName = formElement.getAttribute('name');

    validatorForms[formName] = formValidator;
    formValidator.enableValidation();
  })
}

enableValidation(formValidationConfig);

//слушатели
popupWithFormProfile.setEventListeners();
popupWithFormPlace.setEventListeners();
popupWithImage.setEventListeners();


