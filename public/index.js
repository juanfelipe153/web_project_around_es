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
const imagePopupElement = document.querySelector('#image-popup');
const imagePopup = new PopupWithImage(imagePopupElement);
imagePopup.setEventListeners();
function createCard(item) {
    const cardTemplate = document.querySelector(defaultFormConfig.templateSelector);
    const card = new Card({ cardImage: item.cardImage, cardTitle: item.cardTitle }, cardTemplate, (cardImage, cardTitle) => {
        imagePopup.open(cardImage, cardTitle);
    });
    return card.generateCard();
}
const cardListContainer = document.querySelector('.cards__list');
const cardSection = new Section({
    itemsList: initialCards.map(c => ({ cardImage: c.link, cardTitle: c.name })),
    renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
    }
}, cardListContainer);
cardSection.renderItems();
const profilePopupElement = document.querySelector('#edit-popup');
const profilePopup = new PopupWithForm(profilePopupElement, (formData) => {
    userInfo.setUserInfo({
        name: formData.name,
        about: formData.description
    });
    profilePopup.close();
});
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