import { Popup } from "./Popup";

class PopupWithImage extends Popup {

    private popupImage: HTMLImageElement;
    private imageCaption: HTMLElement;

    constructor(popupElement: HTMLElement){
        super(popupElement);

        this.popupImage = this.popupElement.querySelector('.popup__image') as HTMLImageElement;
        this.imageCaption = this.popupElement.querySelector('.popup__caption') as HTMLElement;
        
    };

    public openWithImage(name:string, link:string):void{
        this.popupImage.src = link;
        this.popupImage.alt = name;
        this.imageCaption.textContent = name;

        super.open();
    }

    
};

