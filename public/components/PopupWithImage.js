import { Popup } from "./Popup";
export class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this.popupImage = this.popupElement.querySelector('.popup__image');
        this.imageCaption = this.popupElement.querySelector('.popup__caption');
    }
    ;
    open(name, link) {
        if (name === undefined || link === undefined) {
            super.open();
            return;
        }
        this.popupImage.src = link;
        this.popupImage.alt = name;
        this.imageCaption.textContent = name;
        super.open();
    }
    ;
}
;
//# sourceMappingURL=PopupWithImage.js.map