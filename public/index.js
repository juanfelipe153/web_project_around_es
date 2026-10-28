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
import { PopupWithConfirmation } from './components/PopupWithConfirmation.js';
import { API } from './components/API.js';
const userInfo = new UserInfo({
    nameSelector: '.profile__title',
    aboutSelector: '.profile__description',
    avatarImageSelector: '.profile__image',
});
const api = new API({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "38205c13-8d01-4040-9b30-ad9e7a82c9cb",
        "Content-Type": "application/json"
    }
});
const loadUserInfoServerData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield api.getUserInfo();
        userInfo.setUserInfo({
            name: data.name,
            about: data.about,
            avatarImage: data.avatar
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
const confirmPopupElement = document.querySelector("#confirm-popup");
const confirmPopup = new PopupWithConfirmation(confirmPopupElement);
confirmPopup.setEventListeners();
function createCard(item) {
    const cardTemplate = document.querySelector(defaultFormConfig.templateSelector);
    const card = new Card({ cardImage: item.cardImage, cardTitle: item.cardTitle, cardID: item.cardID || " ", isLiked: item.isLiked || false }, cardTemplate, (cardImage, cardTitle) => {
        imagePopup.open(cardTitle, cardImage);
    }, (cardInstance) => __awaiter(this, void 0, void 0, function* () {
        const isLiked = cardInstance.isLikedStatus();
        try {
            const updatedData = yield api.changeLikeCardStatus(cardInstance.getID(), !isLiked);
            cardInstance.setLikeStatus(updatedData.isLiked);
        }
        catch (error) {
            console.error('Error:', error);
            console.error('5. Error atrapado en el catch:', error);
        }
    }), (cardInstance) => {
        confirmPopup.setSubmitAction(() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield api.deleteCard(cardInstance.getID());
                cardInstance.removeCard();
                confirmPopup.close();
            }
            catch (error) {
                console.error("Error deleting card:", error);
            }
        }));
        confirmPopup.open();
    });
    return card.generateCard();
}
const cardListContainer = document.querySelector('.cards__list');
let cardSection;
const loadInitialCardsFromServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataArray = yield api.getInitialCards();
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
        profilePopup.renderLoading(true, 'Guardando...');
        const updatedData = yield api.updateUserInfo({
            name: formData.name,
            about: formData.description
        });
        userInfo.setUserInfo({
            name: updatedData.name,
            about: updatedData.about
        });
        profilePopup.close();
    }
    catch (error) {
        console.error('Error updating user info:', error);
    }
    finally {
        profilePopup.renderLoading(false);
    }
}));
profilePopup.setEventListeners();
const cardPopupElement = document.querySelector('#new-card-popup');
const cardPopup = new PopupWithForm(cardPopupElement, (formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        cardPopup.renderLoading(true, 'Creando...');
        const cardDataToServer = yield api.addCard({
            name: formData['place-name'],
            link: formData.link
        });
        const cardElement = createCard({ cardImage: cardDataToServer.link, cardTitle: cardDataToServer.name, cardID: cardDataToServer._id, isLiked: cardDataToServer.isLiked });
        cardSection.addItem(cardElement);
        cardPopup.close();
    }
    catch (error) {
        console.error('Error creating new card:', error);
    }
    finally {
        cardPopup.renderLoading(false);
    }
}));
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
const avatarPopupElement = document.querySelector('#edit-avatar-popup');
const avatarPopup = new PopupWithForm(avatarPopupElement, (formData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        avatarPopup.renderLoading(true, 'Guardando...');
        const userData = yield api.updateUserAvatar({
            avatar: formData.avatar
        });
        const profileImage = document.querySelector('.profile__image');
        if (profileImage) {
            profileImage.src = userData.avatar;
        }
        avatarPopup.close();
    }
    catch (error) {
        console.error('Error updating avatar:', error);
    }
    finally {
        avatarPopup.renderLoading(false);
    }
}));
avatarPopup.setEventListeners();
const editAvatarButton = document.querySelector('.profile__image-edit-button');
if (editAvatarButton) {
    editAvatarButton.addEventListener('click', () => {
        avatarPopup.open();
    });
}
//# sourceMappingURL=index.js.map