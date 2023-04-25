export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-btn')
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
   }
  

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }


  setEventListeners() {
    this._buttonClose.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('mousedown', this._handleOverlayClose);
  }
}