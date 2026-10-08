export class FormValidator {
    constructor(config, element) {
        this.showErrorMessage = (inputElement, message) => {
            const errorElement = this.actualFormElement.querySelector(`#${inputElement.name}-error`);
            errorElement.textContent = message;
            errorElement.classList.add(this.inputErrorActive);
        };
        this.hideErrorMessage = (inputElement) => {
            const errorElement = this.actualFormElement.querySelector(`#${inputElement.name}-error`);
            errorElement.classList.remove(this.inputErrorActive);
        };
        this.formSelector = config.formSelector;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inputErrorStyle = config.inputErrorStyle;
        this.inputErrorActive = config.inputErrorActive;
        this.actualFormElement = element;
        this.inputList = Array.from(this.actualFormElement.querySelectorAll(this.inputSelector));
        this.buttonElement = this.actualFormElement.querySelector(this.submitButtonSelector);
    }
    ;
    toggleButtonState(inputList, buttonElement) {
        const allValid = inputList.every((input) => input.validity.valid);
        if (!allValid) {
            buttonElement.disabled = true;
        }
        else {
            buttonElement.disabled = false;
        }
    }
    validateInput(inputElement, inputList, buttonElement) {
        if (inputElement.validity.valid) {
            this.hideErrorMessage(inputElement);
        }
        else {
            this.showErrorMessage(inputElement, inputElement.validationMessage);
        }
        this.toggleButtonState(inputList, buttonElement);
    }
    setEventListeners() {
        this.toggleButtonState(this.inputList, this.buttonElement);
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.validateInput(inputElement, this.inputList, this.buttonElement);
            });
            inputElement.addEventListener('blur', () => {
                this.validateInput(inputElement, this.inputList, this.buttonElement);
            });
        });
        this.actualFormElement.addEventListener('submit', (evt) => {
            let formValid = true;
            this.inputList.forEach((inputElement) => {
                if (!inputElement.validity.valid) {
                    this.showErrorMessage(inputElement, inputElement.validationMessage);
                    formValid = false;
                }
            });
            if (!formValid) {
                evt.preventDefault();
                return;
            }
        });
    }
    ;
    enableValidation() {
        this.setEventListeners();
    }
    ;
    resetValidation() {
        this.toggleButtonState(this.inputList, this.buttonElement);
        this.inputList.forEach((inputElement) => {
            this.hideErrorMessage(inputElement);
        });
    }
    ;
}
//# sourceMappingURL=FormValidator.js.map