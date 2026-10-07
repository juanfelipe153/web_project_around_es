export class Popup{

    protected popupElement: HTMLElement;


    constructor(popupSelector: HTMLElement){
        this.popupElement = popupSelector;
        this.handleEscClose = this.handleEscClose.bind(this);      
    };

    

    public open():void{
        this.popupElement.classList.add('popup_is-opened');
        document.addEventListener("keydown",this.handleEscClose);       
    };
 
    
    public close():void{
        this.popupElement.classList.remove('popup_is-opened');
        document.removeEventListener("keydown",this.handleEscClose);
    };


    private handleEscClose(event:KeyboardEvent):void{
        
        if (event.key === 'Escape') {
            this.close();
        }
    };

    public setEventListeners() : void{
        this.popupElement.addEventListener("mousedown", (event: MouseEvent) => {
            if(event.target === this.popupElement || (event.target as HTMLElement).classList.contains('popup__close')){
                this.close();
            };
        });
    };
};