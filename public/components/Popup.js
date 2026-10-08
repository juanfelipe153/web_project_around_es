export class Popup {
    constructor(popupSelector) {
        this.popupElement = popupSelector;
        this.handleEscClose = this.handleEscClose.bind(this);
    }
    ;
    open() {
        this.popupElement.classList.add('popup_is-opened');
        document.addEventListener("keydown", this.handleEscClose);
    }
    ;
    close() {
        this.popupElement.classList.remove('popup_is-opened');
        document.removeEventListener("keydown", this.handleEscClose);
    }
    ;
    handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    ;
    setEventListeners() {
        this.popupElement.addEventListener("mousedown", (event) => {
            if (event.target === this.popupElement || event.target.classList.contains('popup__close')) {
                this.close();
            }
            ;
        });
    }
    ;
}
;
//# sourceMappingURL=Popup.js.map