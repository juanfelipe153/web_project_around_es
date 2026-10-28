import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup{
    private _form: HTMLFormElement;
    private _handleFormSubmit!: () => void;

    constructor(popupSelector: HTMLElement) {
        super(popupSelector);
        this._form = this.popupElement.querySelector('.popup__form') as HTMLFormElement;
    }
    
    public setSubmitAction(action: () => void) {
        this._handleFormSubmit = action;
    }

    public setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            if (this._handleFormSubmit) {
                this._handleFormSubmit();
            }
        });
    }
}