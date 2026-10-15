export interface CardData {
    cardImage:string;
    cardTitle:string;
};

export class Card {

    private cardImage: string;
    private cardTitle: string;
    private templateSelector: HTMLTemplateElement;
    private handleCardClick: (cardImage:string, cardTitle:string) => void;

    constructor ( CardData:{cardImage:string,cardTitle:string}, templateSelector: HTMLTemplateElement,handleCardClick: (cardImage:string, cardTitle:string) => void){
        this.cardImage = CardData.cardImage;
        this.cardTitle = CardData.cardTitle;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }

    private getTemplate(): HTMLElement {
    return this.templateSelector.content
        .querySelector(".card")!
        .cloneNode(true) as HTMLElement;
}

public generateCard(): HTMLElement {
    const cardElement = this.getTemplate();

    const cardName = cardElement.querySelector(".card__title") as HTMLElement;
    cardName.textContent = this.cardTitle;

    const cardImageLink = cardElement.querySelector(".card__image") as HTMLImageElement;
    cardImageLink.src = this.cardImage;
    cardImageLink.alt = this.cardTitle;
    cardImageLink.addEventListener("click", () => {
        this.handleCardClick(this.cardImage, this.cardTitle);
    });

    const likeButton = cardElement.querySelector(".card__like-button") as HTMLButtonElement;
    likeButton.setAttribute("aria-label", "Me gusta");
    likeButton.addEventListener("click", () => {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    const deleteButton = cardElement.querySelector(".card__delete-button") as HTMLButtonElement;
    deleteButton.setAttribute("aria-label", "Eliminar tarjeta");
    deleteButton.addEventListener("click", () => {
        cardElement.remove();
    });

    return cardElement;
};

    
};