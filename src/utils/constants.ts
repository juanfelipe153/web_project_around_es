export const initialCards = [
    {name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"},
    {name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"},
    {name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"},
    {name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"},
    {name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"},
    {name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"}
];

export const defaultFormConfig = {
    
    formSelector: '.popup__form',
    inputSelector: 'popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorStyle: '.form__input-error',
    inputErrorActive: '.form__input-error_active',
    templateSelector: '#card_template',    
};

/*const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const editPopupModal = document.querySelector('#edit-popup');
const newCardPopUpModal = document.querySelector("#new-card-popup");
const imagePopUpModal = document.querySelector("#image-popup");
const popUpImage = imagePopUpModal!.querySelector(".popup__image");
const imageCaption = imagePopUpModal!.querySelector(".popup__caption");
const formElement = document.querySelectorAll('.popup__form');
const cardTemplate = document.querySelector('#card_template');
const cardList = document.querySelector('.cards__list');
const profileTitle = document.querySelector('.profile__title');
const allPopups = document.querySelectorAll('.popup');*/