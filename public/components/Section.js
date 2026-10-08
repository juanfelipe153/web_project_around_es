export class Section {
    constructor(renderData, cardList) {
        this.itemsList = renderData.itemsList;
        this.renderer = renderData.renderer;
        this.cardList = cardList;
    }
    ;
    renderItems() {
        this.itemsList.forEach((item) => {
            this.renderer(item);
        });
    }
    ;
    addItem(element) {
        this.cardList.prepend(element);
    }
    ;
}
;
//# sourceMappingURL=Section.js.map