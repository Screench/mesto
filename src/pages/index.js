import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, formValidationConfig } from '../components/utils.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithRemoval } from '../components/PopupWithRemoval.js';
import { apiConfig } from '../components/utils.js';
import { Api } from '../components/Api.js';

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
const popupOpenAvatar = document.querySelector('.profile__avatar');
let userCurrentId;

const api = new Api(apiConfig);

Promise.all([api.getUserInfoApi(), api.getServerCards()])
  .then(([resUser, resCard]) => {
    userCurrentId = resUser._id;
    userInfo.setUserInfo(resUser);
    userInfo.setUserInfo(resUser);
    cardsContainer.renderItems(resCard, userCurrentId)
  })
  .catch((err) => alert(err));

const cardImagePopup = new PopupWithImage('.popup_type_image');


//создать карточку
const createCard = (data, user) => {
  const card = new Card({
    data: data, userId: user, cardTemplateSelector: cardTemplateSelector,

    handleCardDelete: (cardId, cardElement) => {
      popupFormDelete.open(cardId, cardElement);
    },

    handleCardClick: () => {
      cardImagePopup.open(data);
    },
    handleCardLike: (cardId) => {
      api.putCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res);
        })
        .catch((err) => alert(err))
    },

    handleCardDeleteLike: (cardId) => {
      api.deleteCardLike(cardId)
        .then((res) => {
          card.renderCardLike(res)
        })
        .catch((err) => alert(err))
    }
  });

  return card.generateCard();
}



//создать секцию
const cardsContainer = new Section({
  renderer: (item, userId) => {
    cardsContainer.addItem(createCard(item, userId));
  },
}, '.elements'
);

//получить данные пользователя
const userInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__occupation',
  selectorUserAvatar: '.profile__image'
})

//создать попап профиля
const popupWithFormProfile = new PopupWithForm('.popup_type_profile', {
  submitCallback: (data) => {
    popupWithFormProfile.renderPreloader(true, 'Загрузка...')
    api.setUserInfoApi(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithFormProfile.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupWithFormProfile.renderPreloader(false);
      })
  }
})

//открыть попап профиля
popupOpenEdit.addEventListener('click', () => {
  popupWithFormProfile.open();
  popupWithFormProfile.setInputValues(userInfo.getUserInfo());
  validatorForms[formProfileSelector].clearValidationForm();
});

//создать попап места
const popupWithFormPlace = new PopupWithForm('.popup_type_place', {
  submitCallback: (data) => {
    popupWithFormPlace.renderPreloader(true, 'Cохранение...')
    api.addNewCard(data)
      .then((newCard) => {
        cardsContainer.prependItem(createCard(newCard, userCurrentId));
        popupWithFormPlace.close();
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupWithFormPlace.renderPreloader(false);
      })
  }
})

//открыть попап места
popupOpenAdd.addEventListener('click', () => {
  popupWithFormPlace.open();
  validatorForms[formPlaceSelector].clearValidationForm();
});


//Создать попап аватара

const popupFormAvatar = new PopupWithForm('.popup_type_avatar', {
  submitCallback:(data) => {
    popupFormAvatar.renderPreloader(true, 'Загрузка...')
    api.setUserAvatar(data)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser);
      popupFormAvatar.close();

    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAvatar.renderPreloader(false);
    })
  }
})

//открыть попап аватара
popupOpenAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
  validatorForms['form-avatar'].clearValidationForm();
})


//создать попап подтверждения удаления
const popupFormDelete = new PopupWithRemoval('.popup_type_delete', {
  submitCallback: (id, card) => {
    popupFormDelete.renderPreloader(true, 'Удаление....');
    api.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupFormDelete.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormDelete.renderPreloader(false);
    })
  }
})



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
popupFormAvatar.setEventListeners();
popupFormDelete.setEventListeners();


