

export class FormValidator {

    private formSelector: string;
    private inputSelector: string;
    private submitButtonSelector: string;
    private inputErrorStyle: string;
    private inputErrorActive: string;
    private actualFormElement: HTMLElement;
    private inputList: HTMLInputElement[];
    private buttonElement: HTMLButtonElement;

    constructor(
        config: {formSelector:string; inputSelector: string; submitButtonSelector: string; inputErrorStyle: string; inputErrorActive: string},element:HTMLElement){
        this.formSelector = config.formSelector;
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inputErrorStyle = config.inputErrorStyle;
        this.inputErrorActive = config.inputErrorActive;
        this.actualFormElement = element;

        this.inputList = Array.from(this.actualFormElement.querySelectorAll(this.inputSelector)) as HTMLInputElement[];
        this.buttonElement = this.actualFormElement.querySelector(this.submitButtonSelector) as HTMLButtonElement;
    };


    private showErrorMessage = (inputElement:HTMLInputElement, message:string):void => {
        const errorElement = this.actualFormElement.querySelector(`#${inputElement.name}-error`);
        errorElement!.textContent = message;
        errorElement!.classList.add(this.inputErrorActive);
    };

    private hideErrorMessage = (inputElement:HTMLInputElement):void => {
        const errorElement = this.actualFormElement.querySelector(`#${inputElement.name}-error`);
        errorElement!.classList.remove(this.inputErrorActive);
    };


    private toggleButtonState(inputList: HTMLInputElement[], buttonElement: HTMLButtonElement) {
        const allValid = inputList.every((input) => input.validity.valid);

        if (!allValid) {
            buttonElement.disabled = true;
        } else {
            buttonElement.disabled = false;
        }
    }

    private validateInput(inputElement:HTMLInputElement, inputList: HTMLInputElement[], buttonElement: HTMLButtonElement) {
        if (inputElement.validity.valid) {
            this.hideErrorMessage(inputElement);
        } else {
            this.showErrorMessage(inputElement, inputElement.validationMessage);
        }

        this.toggleButtonState(inputList, buttonElement);
    }

    private setEventListeners() {        
    
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
    };
    
    public enableValidation():void{
        this.setEventListeners();
    };

    public resetValidation():void{
        this.toggleButtonState(this.inputList, this.buttonElement);

        this.inputList.forEach((inputElement) => {
            this.hideErrorMessage(inputElement);
        });
    };
    
    
}