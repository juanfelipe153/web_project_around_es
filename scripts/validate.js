// ====== VALIDACIÓN ======

const showErrorMessage = (inputElement, message) => {
    const currentForm = inputElement.closest('.popup__form');
    const errorElement = currentForm.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = message;
    errorElement.classList.add('form__input-error_active');
}

const hideErrorMessage = (inputElement) => {
    const currentForm = inputElement.closest('.popup__form');
    const errorElement = currentForm.querySelector(`#${inputElement.name}-error`);
    errorElement.textContent = " ";
    errorElement.classList.remove('form__input-error_active');
}


function toggleButtonState(inputList, submitButton) {
    const allValid = inputList.every((input) => input.validity.valid);

    if (!allValid) {
        submitButton.disabled = true;
    } else {
        submitButton.disabled = false;
    }
}

function validateInput(inputElement, inputList, submitButton) {
    if (inputElement.validity.valid) {
        hideErrorMessage(inputElement);
    } else {
        showErrorMessage(inputElement, inputElement.validationMessage);
    }

    toggleButtonState(inputList, submitButton);
}

function setEventListeners(form, handlers) {
    const inputList = Array.from(form.querySelectorAll('.popup__input'));
    const submitButton = form.querySelector('.popup__button');
 
    toggleButtonState(inputList, submitButton);
 
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput(inputElement, inputList, submitButton);
        });
 
        inputElement.addEventListener('blur', () => {
            validateInput(inputElement, inputList, submitButton);
        });
    });
 
    form.addEventListener('submit', (evt) => {
        let formValid = true;
 
        inputList.forEach((inputElement) => {
            if (!inputElement.validity.valid) {
                showErrorMessage(inputElement, inputElement.validationMessage);
                formValid = false;
            }
        });
 
        if (!formValid) {
            evt.preventDefault();
            return;
        }
 
        if (evt.target.id === "new-card-form") {
            handlers.handleCardFormSubmit(evt);
        } else if (evt.target.id === "edit-profile-form") {
            handlers.handleProfileFormSubmit(evt);
        }
 
        toggleButtonState(inputList, submitButton);
    });
}
 


export { setEventListeners };