import { Card } from './components/Card.js'; 
import { FormValidator } from './components/FormValidator.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { Section } from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';
import { initialCards, defaultFormConfig } from './utils/constants.js';


const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__description'
});


const imagePopupElement = document.querySelector('#image-popup') as HTMLElement; 
const imagePopup = new PopupWithImage(imagePopupElement);
imagePopup.setEventListeners();


function createCard(item: { cardImage: string; cardTitle: string }) {
    const cardTemplate = document.querySelector(defaultFormConfig.templateSelector) as HTMLTemplateElement;
    
    const card = new Card(
        { cardImage: item.cardImage, cardTitle: item.cardTitle },
        cardTemplate,
        (cardImage, cardTitle) => {
            imagePopup.open(cardImage, cardTitle); 
        }
    );
    
    return card.generateCard();
}


const cardListContainer = document.querySelector('.cards__list') as HTMLElement; 
const cardSection = new Section(
    {
        itemsList: initialCards.map(c => ({ cardImage: c.link, cardTitle: c.name })),
        renderer: (item) => {
            const cardElement = createCard(item);
            cardSection.addItem(cardElement);
        }
    },
    cardListContainer
);
cardSection.renderItems();


const profilePopupElement = document.querySelector('#edit-popup') as HTMLElement; 
const profilePopup = new PopupWithForm(
    profilePopupElement,
    (formData) => {
        
        userInfo.setUserInfo({
            name: formData.name,
            about: formData.description
        });
        profilePopup.close();
    }
);
profilePopup.setEventListeners();


const cardPopupElement = document.querySelector('#new-card-popup') as HTMLElement; 
const cardPopup = new PopupWithForm(
    cardPopupElement,
    (formData) => {
        
        const newCardData = { cardImage: formData.link, cardTitle: formData['place-name'] };
        const cardElement = createCard(newCardData);
        cardSection.addItem(cardElement);
        cardPopup.close();
    }
);
cardPopup.setEventListeners();


const formValidators: Record<string, FormValidator> = {};

const enableValidation = (config: typeof defaultFormConfig) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector)) as HTMLElement[];
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('id') || '';
        
        validator.enableValidation();
        formValidators[formName] = validator;
    });
};

enableValidation(defaultFormConfig);


const profileEditButton = document.querySelector('.profile__edit-button') as HTMLButtonElement;
const cardAddButton = document.querySelector('.profile__add-button') as HTMLButtonElement;
const profileNameInput = document.querySelector('.popup__input_type_name') as HTMLInputElement;
const profileAboutInput = document.querySelector('.popup__input_type_description') as HTMLInputElement;

profileEditButton.addEventListener('click', () => {
    
    const currentUser = userInfo.getUserInfo();
    profileNameInput.value = currentUser.name;
    profileAboutInput.value = currentUser.about;

    
    formValidators['edit-profile-form']?.resetValidation(); 

    profilePopup.open();
});

cardAddButton.addEventListener('click', () => {
    formValidators['new-card-form']?.resetValidation(); 
    cardPopup.open();
});