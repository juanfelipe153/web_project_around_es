var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { Section } from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';
import { defaultFormConfig } from './utils/constants.js';
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__description'
});
const loadUserInfoServerData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('https://around-api.es.tripleten-services.com/v1/users/me', { headers: { authorization: "38205c13-8d01-4040-9b30-ad9e7a82c9cb" } });
        if (!res.ok) {
            throw new Error('Error: ' + res.status);
        }
        const data = yield res.json();
        userInfo.setUserInfo({
            name: data.name,
            about: data.about
        });
    }
    catch (error) {
        console.error('Error fetching user data:', error);
    }
});
loadUserInfoServerData();
const imagePopupElement = document.querySelector('#image-popup');
const imagePopup = new PopupWithImage(imagePopupElement);
imagePopup.setEventListeners();
function createCard(item) {
    const cardTemplate = document.querySelector(defaultFormConfig.templateSelector);
    const card = new Card({ cardImage: item.cardImage, cardTitle: item.cardTitle, cardID: item.cardID || " ", isLiked: item.isLiked || false }, cardTemplate, (cardImage, cardTitle) => {
        imagePopup.open(cardTitle, cardImage);
    }, (cardInstance) => __awaiter(this, void 0, void 0, function* () {
        const isLiked = cardInstance.isLikedStatus();
        const fetchMethod = isLiked ? "DELETE" : "PUT";
        try {
            const res = yield fetch(`https://around-api.es.tripleten-services.com/v1/cards/likes/${cardInstance.getID()}`, {
                method: fetchMethod,
                headers: { authorization: "38205c13-8d01-4040-9b30-ad9e7a82c9cb" }
            });
            if (!res.ok) {
                throw new Error("Error" + res.status);
            }
            const updatedData = yield res.json();
            cardInstance.setLikeStatus(updatedData.isLiked);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }));
    return card.generateCard();
}
const cardListContainer = document.querySelector('.cards__list');
let cardSection;
const loadInitialCardsFromServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://around-api.es.tripleten-services.com/v1/cards/", { headers: { authorization: "38205c13-8d01-4040-9b30-ad9e7a82c9cb" } });
        if (!res.ok) {
            throw new Error('Error: ' + res.status);
        }
        const dataArray = yield res.json();
        cardSection = new Section({
            itemsList: dataArray.map((c) => ({ cardImage: c.link, cardTitle: c.name, cardID: c._id, isLiked: c.isLiked })),
            renderer: (item) => {
                const cardElement = createCard(item);
                cardSection.addItem(cardElement);
            }
        }, cardListContainer);
        cardSection.renderItems();
    }
    catch (error) {
        console.error('Error fetching initial cards:', error);
    }
});
loadInitialCardsFromServer();
const profilePopupElement = document.querySelector('#edit-popup');
const profilePopup = new PopupWithForm(profilePopupElement, (formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('https://around-api.es.tripleten-services.com/v1/users/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'authorization': "38205c13-8d01-4040-9b30-ad9e7a82c9cb"
            },
            body: JSON.stringify({
                name: formData.name,
                about: formData.description
            })
        });
        if (!res.ok) {
            throw new Error('Error: ' + res.status);
        }
        const updatedData = yield res.json();
        userInfo.setUserInfo({
            name: updatedData.name,
            about: updatedData.about
        });
        profilePopup.close();
    }
    catch (error) {
        console.error('Error updating user info:', error);
    }
}));
profilePopup.setEventListeners();
const cardPopupElement = document.querySelector('#new-card-popup');
const cardPopup = new PopupWithForm(cardPopupElement, (formData) => {
    const newCardData = { cardImage: formData.link, cardTitle: formData['place-name'] };
    const cardElement = createCard(newCardData);
    cardSection.addItem(cardElement);
    cardPopup.close();
});
cardPopup.setEventListeners();
const formValidators = {};
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('id') || '';
        validator.enableValidation();
        formValidators[formName] = validator;
    });
};
enableValidation(defaultFormConfig);
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileAboutInput = document.querySelector('.popup__input_type_description');
profileEditButton.addEventListener('click', () => {
    var _a;
    const currentUser = userInfo.getUserInfo();
    profileNameInput.value = currentUser.name;
    profileAboutInput.value = currentUser.about;
    (_a = formValidators['edit-profile-form']) === null || _a === void 0 ? void 0 : _a.resetValidation();
    profilePopup.open();
});
cardAddButton.addEventListener('click', () => {
    var _a;
    (_a = formValidators['new-card-form']) === null || _a === void 0 ? void 0 : _a.resetValidation();
    cardPopup.open();
});
//# sourceMappingURL=index.js.map