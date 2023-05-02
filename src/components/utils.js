export const initialCards = {};

fetch('https://mesto.nomoreparties.co/v1/cohort-65/cards', {
  headers: {
    authorization: '65913fd9-7c89-4468-aff0-c32cf1d9a941'
  }
})
  .then(res => res.json())
  .then((result) => {
    initialCards = result;
  });


// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//   }
// ];


export const formValidationConfig = {
 formSelector: '.popup__form',
 inputSelector: '.popup__input',
 submitButtonSelector: '.popup__submit-btn',
 inactiveButtonClass: 'popup__submit-btn_disabled',
 inputErrorClass: 'popup__input_type_error',
 errorClass: 'popup__error'
}



