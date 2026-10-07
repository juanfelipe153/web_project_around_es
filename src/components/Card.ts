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

    private getTemplate(): HTMLElement{
        const cardElement = this.templateSelector.content.cloneNode(true) as HTMLElement;
        return cardElement;
    };
    
    public generateCard(){
        
        const cardElement = this.getTemplate() ;
        
        const cardName = cardElement.querySelector(".card__title") as HTMLElement;
        cardName.textContent = this.cardTitle;

        const cardImageLink = cardElement.querySelector(".card__image") as HTMLImageElement;
        cardImageLink.src = this.cardImage;
        cardImageLink.addEventListener("click",() => {

            this.handleCardClick(this.cardImage,this.cardTitle) ;     
            
        });

        const likeButton = cardElement.querySelector(".card__like-button");
        likeButton!.addEventListener("click",function(){
            likeButton!.classList.toggle("card__like-button_is-active");
        });

        const deleteButton = cardElement.querySelector(".card__delete-button");
        deleteButton!.addEventListener("click", function() {
            cardElement.remove();
        });

        return cardElement;
    };

    
};