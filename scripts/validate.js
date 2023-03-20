enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 
  
//Валидация форм
function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((form) => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      form.addEventListener('input', () => {
        toggleButton(form, config);
      });
  
      addInputListners(form, config);
      toggleButton(form, config);
    });
  }
  
  //Вывод ошибок валидации
  function handleFormInput (evt, config) {
    const input = evt.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);
  
    if (input.validity.valid) {
      input.classList.remove(config.inputErrorClass)
      errorElement.textContent = '';
    } else {
      input.classList.add(config.inputErrorClass);
      errorElement.textContent = input.validationMessage;
    }
  }
  
  //Тоггл кнопки сабмит
  function toggleButton (form, config) {
    const buttonSubmit = form.querySelector(config.submitButtonSelector);
    const isFormValid = form.checkValidity();
  
    buttonSubmit.disabled = !isFormValid;
    buttonSubmit.classList.toggle('popup__submit-btn_disabled', !isFormValid);
  }
  
  //Слушатели для инпутов
  function addInputListners (form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  
    inputList.forEach(function (item) {
      item.addEventListener('input', (evt) => {
        handleFormInput(evt, config)
      })
    });
  }
  
