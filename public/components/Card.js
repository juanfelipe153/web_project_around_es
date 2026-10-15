;
export class Card {
    constructor(CardData, templateSelector, handleCardClick) {
        this.cardImage = CardData.cardImage;
        this.cardTitle = CardData.cardTitle;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        return this.templateSelector.content
            .querySelector(".card")
            .cloneNode(true);
    }
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
        const likeButton = cardElement.querySelector(".card__like-button");
        likeButton.setAttribute("aria-label", "Me gusta");
        likeButton.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
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