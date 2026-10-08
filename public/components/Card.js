;
export class Card {
    constructor(CardData, templateSelector, handleCardClick) {
        this.cardImage = CardData.cardImage;
        this.cardTitle = CardData.cardTitle;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardElement = this.templateSelector.content.cloneNode(true);
        return cardElement;
    }
    ;
    generateCard() {
        const cardElement = this.getTemplate();
        const cardName = cardElement.querySelector(".card__title");
        cardName.textContent = this.cardTitle;
        const cardImageLink = cardElement.querySelector(".card__image");
        cardImageLink.src = this.cardImage;
        cardImageLink.addEventListener("click", () => {
            this.handleCardClick(this.cardImage, this.cardTitle);
        });
        const likeButton = cardElement.querySelector(".card__like-button");
        likeButton.addEventListener("click", function () {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        const deleteButton = cardElement.querySelector(".card__delete-button");
        deleteButton.addEventListener("click", function () {
            cardElement.remove();
        });
        return cardElement;
    }
    ;
}
;
//# sourceMappingURL=Card.js.map