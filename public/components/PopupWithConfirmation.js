import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this.popupElement.querySelector('.popup__form');
    }
    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this._handleFormSubmit) {
                this._handleFormSubmit();
            }
        });
    }
}
//# sourceMappingURL=PopupWithConfirmation.js.map