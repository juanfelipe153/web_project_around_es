
type RenderFunction <T> = (item:T) => void;

interface RenderData<T>{
    itemsList: T[];
    renderer: RenderFunction<T>;
}

export class Section <T> {

    private itemsList: T[];
    private renderer: RenderFunction<T>;
    private cardList: HTMLElement

    constructor(renderData:{itemsList: T[] ,renderer:RenderFunction<T>},cardList:HTMLElement){
        this.itemsList = renderData.itemsList;
        this.renderer = renderData.renderer;
        this.cardList = cardList;
    };


    public  renderItems(){
        this.itemsList.forEach((item) => {
            this.renderer(item);
        });
    };

    public addItem(element:HTMLElement):void{
        this.cardList.prepend(element);
    };

};
