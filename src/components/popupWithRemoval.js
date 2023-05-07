import Popup from "./Popup.js";

export class PopupWithRemoval extends Popup {
  constructor (selectorPopup, {submitCallback}) {
    super(selectorPopup);
    this._submitCallback = submitCallback;
    this._buttonSubmit = this._popup.querySelector('.popup__submit-btn');

  }

  open(cardElement, idCard) {
    super.open();
    this.id = idCard;
    this.card = cardElement;
  }

  
  renderPreloader(loading, displayText) {
    if (!this._buttonSubmit) return;
    if (loading) {
      this.defaultText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = displayText;
    } else {
      this._buttonSubmit.textContent = this.defaultText;

      }
    }


    setEventListeners() {
      super.setEventListeners();
      this._buttonSubmit.addEventListener('click', () => {
        this._submitCallback(this.id, this.card);

      })
    }


  }