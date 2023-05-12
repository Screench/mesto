import { apiConfig } from '../components/utils.js';
import { Api } from '../components/Api.js';
import { formValidationConfig } from '../components/utils.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirmation } from '../components/popupWithConfirmation.js';
import '../pages/index.css';

const popupImageSelector = '.popup_type_image';
const popupProfileSelector = '.popup_type_profile';
const popupPlaceSelector = '.popup_type_place';
const popupAvatarSelector = '.popup_type_avatar';
const popupConfirmSelector = '.popup_type_confirm';
const cardElementsSelector = '.elements';
const cardTemplateSelector = '.cardTemplate';
const userNameSelector = '.profile__title';
const userOccupationSelector = '.profile__occupation';
const userAvatarSelector = '.profile__image';
const formProfileSelector = 'profile-form';
const formPlaceSelector = 'place-form';
const formAvatarSelector = 'avatar-form'
const popupOpenEdit = document.querySelector('.profile__edit-btn');  //Кнопка чтобы Редактировать Профиль
const popupOpenAdd = document.querySelector('.profile__add-btn');    //Кнопка чтобы Добавить Место
const popupOpenAvatar = document.querySelector('.profile__avatar');
const popupWithImage = new PopupWithImage(popupImageSelector);
let currentUserID;

//получить данные пользователя
const userInfo = new UserInfo({
  userNameSelector,
  userOccupationSelector,
  userAvatarSelector
})

const api = new Api(apiConfig);

//обращение к серверу
Promise.all([api.getUserInfoApi(), api.getServerCards()])
  .then(([resUser, resCard]) => {
    currentUserID = resUser._id;
    userInfo.setUserInfo(resUser);
    userInfo.setUserAvatar(resUser);
    cardsContainer.renderItems(resCard, currentUserID)
  })
  .catch((err) => window.alert(`Ошибка! ${err}`));


//создать карточку
const createCard = (data, user) => {
  const card = new Card({data: data, userId: user, cardTemplateSelector,
  handleCardRemove: (cardId, cardElement) => {
    popupWithConfirmation.open(cardId, cardElement);
  },
  handleImageClick: () => {
    popupWithImage.open(data);
  },

  handleCardSetLike: (cardId) => {
    api.setCardLike(cardId)
    .then((res) => {
      card.renderCardLike(res);
    })
    .catch((err) => window.alert(`Ошибка! ${err}`));
  },

  handleCardRemoveLike: (cardId) => {
    api.removeCardLike(cardId)
    .then((res) => {
      card.renderCardLike(res)
    })
    .catch((err) => window.alert(`Ошибка! ${err}`));
  }


  });

  return card.generateCard();
}



//создать секцию
const cardsContainer = new Section({
  renderer: (item, userId) => {
    cardsContainer.appendItem(createCard(item, userId));
  },
}, cardElementsSelector
);



//создать попап профиля
const popupWithFormProfile = new PopupWithForm(popupProfileSelector, {
  submitCallback: (data) => {
    popupWithFormProfile.renderPreloader(true, 'Сохранение...')
    api.setUserInfoApi(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupWithFormProfile.close();
      })
      .catch((err) => window.alert(`Ошибка! ${err}`))
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
const popupWithFormPlace = new PopupWithForm(popupPlaceSelector, {
  submitCallback: (data) => {
    popupWithFormPlace.renderPreloader(true, 'Cохранение...')
    api.handleAddNewCard(data)
      .then((newCard) => {
        cardsContainer.prependItem(createCard(newCard, currentUserID));
        popupWithFormPlace.close();
      })
      .catch((err) => window.alert(`Ошибка! ${err}`))
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
const popupFormAvatar = new PopupWithForm(popupAvatarSelector, {
  submitCallback:(data) => {
    popupFormAvatar.renderPreloader(true, 'Выполнение...')
    api.setUserAvatar(data)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser);
      popupFormAvatar.close();

    })
    .catch((err) => window.alert(`Ошибка! ${err}`))
    .finally(() => {
      popupFormAvatar.renderPreloader(false);
    })
  }
})

//открыть попап аватара
popupOpenAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
  validatorForms[formAvatarSelector].clearValidationForm();
})


//создать попап подтверждения удаления
const popupWithConfirmation = new PopupWithConfirmation(popupConfirmSelector, {
  submitCallback: (id, card) => {
    popupWithConfirmation.renderPreloader(true, 'Выполнение...');
    api.deleteCard(id)
    .then(() => {
      card.deleteCard();
      popupWithConfirmation.close();
    })
    .catch((err) => window.alert(`Ошибка! ${err}`))
    .finally(() => {
      popupWithConfirmation.renderPreloader(false);
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
popupWithConfirmation.setEventListeners();


