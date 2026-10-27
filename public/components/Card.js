;
export class Card {
    constructor(CardData, templateSelector, handleCardClick, handleLikeClick) {
        this.cardImage = CardData.cardImage;
        this.cardTitle = CardData.cardTitle;
        this.cardID = CardData.cardID;
        this.isLiked = CardData.isLiked;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
    }
    getTemplate() {
        return this.templateSelector.content
            .querySelector(".card")
            .cloneNode(true);
    }
    ;
    getID() {
        return this.cardID;
    }
    ;
    isLikedStatus() {
        return this.isLiked;
    }
    ;
    setLikeStatus(isLiked) {
        this.isLiked = isLiked;
        if (this.isLiked) {
            this.likeButtonELement.classList.add("card__like-button_is-active");
        }
        else {
            this.likeButtonELement.classList.remove("card__like-button_is-active");
        }
    }
    ;
    generateCard() {
        const cardElement = this.getTemplate();
        const cardName = cardElement.querySelector(".card__title");
        cardName.textContent = this.cardTitle;
        const cardImageLink = cardElement.querySelector(".card__image");
        cardImageLink.src = this.cardImage;
        cardImageLink.alt = this.cardTitle;
        cardImageLink.addEventListener("click", () => {
            this.handleCardClick(this.cardImage, this.cardTitle);
        });
        this.likeButtonELement = cardElement.querySelector(".card__like-button");
        this.likeButtonELement.setAttribute("aria-label", "Me gusta");
        if (this.isLikedStatus()) {
            this.likeButtonELement.classList.add("card__like-button_is-active");
        }
        this.likeButtonELement.addEventListener("click", () => {
            this.handleLikeClick(this);
        });
        /*Hay que incluir esto en loadInitialCards y createCards
        });*/
        const deleteButton = cardElement.querySelector(".card__delete-button");
        deleteButton.setAttribute("aria-label", "Eliminar tarjeta");
        deleteButton.addEventListener("click", () => {
            cardElement.remove();
        });
        return cardElement;
    }
    ;
}
;
//# sourceMappingURL=Card.js.map