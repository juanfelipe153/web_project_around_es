import { Popup } from './Popup.js';


export type FormSubmitHandler = (formData: Record<string, string>) => void;

export class PopupWithForm extends Popup {
    private handleFormSubmit: FormSubmitHandler;
    private form: HTMLFormElement;
    private inputList: NodeListOf<HTMLInputElement>;
    private submitButton: HTMLButtonElement;
    private submitButtonText: string;

    constructor(popupElement: HTMLElement, handleFormSubmit: FormSubmitHandler) {
        
        super(popupElement);
        this.handleFormSubmit = handleFormSubmit;  
        this.form = this.popupElement.querySelector('.popup__form') as HTMLFormElement;
        this.inputList = this.form.querySelectorAll('.popup__input');
        this.submitButton = this.popupElement.querySelector('.popup__button') as HTMLButtonElement;
        this.submitButtonText = this.submitButton.textContent || 'Guardar';

    };


    public renderLoading(isLoading:boolean, loadingText:string ="Guardando..."){
        if (isLoading) {
            this.submitButton.textContent = loadingText;
        } else {
            this.submitButton.textContent = this.submitButtonText;
        }
    };


    private getInputValues(): Record<string, string> {
        const formData: Record<string, string> = {};
        
        this.inputList.forEach((input) => {
            formData[input.name] = input.value;
        });

        return formData;
    };

    
    public setEventListeners(): void {
        
        super.setEventListeners();

        this.form.addEventListener('submit', (evt: SubmitEvent) => {
            evt.preventDefault();
            
            this.handleFormSubmit(this.getInputValues());
        });
    };

    
    public close(): void {
        super.close();
        this.form.reset();
    };
}