import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('.popup__submit-btn');

  }

  open(cardElement, idCard) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }


  renderPreloader(isLoading, buttonText) {
    if (!this._submitButton) return;
    if (isLoading) {
      this.defaultText = this._submitButton.textContent;
      this._submitButton.textContent = buttonText;
    } else {
      this._submitButton.textContent = this.defaultText;
    }
  }


  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => {
      this._submitCallback(this.id, this.card);

    })
  }

}