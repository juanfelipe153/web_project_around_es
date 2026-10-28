export interface CardData {
    cardImage:string;
    cardTitle:string;
    cardID: string;
    isLiked: boolean;
};

export class Card {

    private cardImage: string;
    private cardTitle: string;
    private cardID: string;
    private isLiked: boolean;
    private templateSelector: HTMLTemplateElement;
    private handleCardClick: (cardImage:string, cardTitle:string) => void;
    private handleLikeClick: (cardInstance: Card) => void;
    private likeButtonELement!: HTMLButtonElement;
    private handleDeleteClick: (cardInstance: Card) => void;
    private cardElement!: HTMLElement;

    constructor ( CardData:{
        cardImage:string,
        cardTitle:string, 
        cardID:string, 
        isLiked:boolean
        }, 
        templateSelector: HTMLTemplateElement,
        handleCardClick: (cardImage:string, cardTitle:string) => void,
        handleLikeClick: (cardInstance: Card) => void,
        handleDeleteClick: (cardInstance: Card) => void){
        this.cardImage = CardData.cardImage;
        this.cardTitle = CardData.cardTitle;
        this.cardID = CardData.cardID;
        this.isLiked = CardData.isLiked;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDeleteClick = handleDeleteClick;
    }

    private getTemplate(): HTMLElement {
    return this.templateSelector.content
        .querySelector(".card")!
        .cloneNode(true) as HTMLElement;
};

public getID():string{
    return this.cardID;
};

public isLikedStatus():boolean{
    return this.isLiked;
};

public setLikeStatus(isLiked:boolean):void{
    this.isLiked = isLiked;
    if (this.isLiked){
        this.likeButtonELement.classList.add("card__like-button_is-active");
    }
    else{
         this.likeButtonELement.classList.remove("card__like-button_is-active");
    }

};


public generateCard(): HTMLElement {
    const cardElement = this.getTemplate();
    this.cardElement = cardElement;

    const cardName = cardElement.querySelector(".card__title") as HTMLElement;
    cardName.textContent = this.cardTitle;

    const cardImageLink = cardElement.querySelector(".card__image") as HTMLImageElement;
    cardImageLink.src = this.cardImage;
    cardImageLink.alt = this.cardTitle;
    cardImageLink.addEventListener("click", () => {
        this.handleCardClick(this.cardImage, this.cardTitle);
    });

    this.likeButtonELement = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    this.likeButtonELement.setAttribute("aria-label", "Me gusta");

    if(this.isLikedStatus()){
        this.likeButtonELement.classList.add("card__like-button_is-active")
    }

    this.likeButtonELement.addEventListener("click",() => {
        console.log("1. ¡Se hizo clic en el botón de la tarjeta!", this.cardID);
        this.handleLikeClick(this);
    });
    
   

    const deleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;
    deleteButton.setAttribute("aria-label", "Eliminar tarjeta");
    deleteButton.addEventListener("click", () => {
        //cardElement.remove();
        this.handleDeleteClick(this);
    });

    return cardElement;
};

public removeCard():void{
    this.cardElement.remove();
}

    
};