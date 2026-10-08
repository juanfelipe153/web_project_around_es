import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor(popupElement, handleFormSubmit) {
        super(popupElement);
        this.handleFormSubmit = handleFormSubmit;
        this.form = this.popupElement.querySelector('.popup__form');
        this.inputList = this.form.querySelectorAll('.popup__input');
    }
    ;
    getInputValues() {
        const formData = {};
        this.inputList.forEach((input) => {
            formData[input.name] = input.value;
        });
        return formData;
    }
    ;
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    ;
    close() {
        super.close();
        this.form.reset();
    }
    ;
}
//# sourceMappingURL=PopupWithForm.js.map