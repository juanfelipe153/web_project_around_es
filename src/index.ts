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


const loadUserInfoServerData = async (): Promise<void> => {
    try{
        
        const data = await api.getUserInfo();
        userInfo.setUserInfo({
            name: data.name,
            about: data.about,
            avatarImage: data.avatar

        });
    }
    catch(error){
        console.error('Error fetching user data:', error);
    }   
};
loadUserInfoServerData();



const imagePopupElement = document.querySelector('#image-popup') as HTMLElement; 
const imagePopup = new PopupWithImage(imagePopupElement);
imagePopup.setEventListeners();

const confirmPopupElement = document.querySelector("#confirm-popup") as HTMLElement;
const confirmPopup = new PopupWithConfirmation(confirmPopupElement);
confirmPopup.setEventListeners();






function createCard(item: { cardImage: string; cardTitle: string; cardID?: string; isLiked?: boolean}) {
    const cardTemplate = document.querySelector(defaultFormConfig.templateSelector) as HTMLTemplateElement;
    
    const card = new Card(
        { cardImage: item.cardImage, cardTitle: item.cardTitle, cardID: item.cardID || " ", isLiked: item.isLiked || false},
        cardTemplate,
        (cardImage, cardTitle) => {
            imagePopup.open(cardTitle,cardImage); 
        },
        async (cardInstance) => {            
            const isLiked = cardInstance.isLikedStatus();
            
            try{                
                
                const updatedData = await api.changeLikeCardStatus(cardInstance.getID(),!isLiked);             
                cardInstance.setLikeStatus(updatedData.isLiked);

            }
            catch(error){
                console.error('Error:', error);
                console.error('5. Error atrapado en el catch:', error);
            }
        },
        (cardInstance) => {
            confirmPopup.setSubmitAction(async() => {
                try{
                   
                    await api.deleteCard(cardInstance.getID());
                    cardInstance.removeCard();
                    confirmPopup.close();
                }
                catch(error){
                    console.error("Error deleting card:",error);
                }
            });
            confirmPopup.open();
        }
        
    );    
    return card.generateCard();
}





const cardListContainer = document.querySelector('.cards__list') as HTMLElement; 
let cardSection: Section<{ cardImage: string; cardTitle: string }>;

const loadInitialCardsFromServer = async (): Promise<void> => {
    try{
        
        const dataArray = await api.getInitialCards();
        cardSection = new Section(
            {
                itemsList: dataArray.map((c:any) => ({ cardImage: c.link, cardTitle: c.name,cardID: c._id, isLiked: c.isLiked })),
                renderer: (item) => {
                    const cardElement = createCard(item);
                    cardSection.addItem(cardElement);
                }
            },
            cardListContainer
        );
        cardSection.renderItems();
    }
    catch(error){
        console.error('Error fetching initial cards:', error);
    }
};
loadInitialCardsFromServer();



const profilePopupElement = document.querySelector('#edit-popup') as HTMLElement; 
const profilePopup = new PopupWithForm(
    profilePopupElement,
    async (formData) => {
        try{
            profilePopup.renderLoading(true, 'Guardando...');
           
            const updatedData = await api.updateUserInfo({
                name: formData.name,
                about: formData.description
            });

            userInfo.setUserInfo({
                name: updatedData.name,
                about: updatedData.about                
            });
            profilePopup.close();
        }    
        catch(error){
            console.error('Error updating user info:', error);
        } 
        finally{
            profilePopup.renderLoading(false);
        }
    }
);
profilePopup.setEventListeners();


const cardPopupElement = document.querySelector('#new-card-popup') as HTMLElement; 
const cardPopup = new PopupWithForm(
    cardPopupElement,
    async (formData) => {
        try{
            cardPopup.renderLoading(true, 'Creando...');
            

        const cardDataToServer = await api.addCard({
            name: formData['place-name'],
            link:formData.link
        })
                
        const cardElement = createCard({cardImage: cardDataToServer.link, cardTitle: cardDataToServer.name, cardID: cardDataToServer._id, isLiked: cardDataToServer.isLiked});
        cardSection.addItem(cardElement);
        cardPopup.close();
        } 
        catch(error){
            console.error('Error creating new card:', error);
        }
        finally{
            cardPopup.renderLoading(false);
        }       
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

const avatarPopupElement = document.querySelector('#edit-avatar-popup') as HTMLElement;
const avatarPopup = new PopupWithForm(
    avatarPopupElement,
    async (formData) => {
        try {
            avatarPopup.renderLoading(true, 'Guardando...');

            const userData = await api.updateUserAvatar({
                avatar: formData.avatar
            })

            
            const profileImage = document.querySelector('.profile__image') as HTMLImageElement;
            if (profileImage) {
                profileImage.src = userData.avatar;
            }

            avatarPopup.close();

        } catch (error) {
            console.error('Error updating avatar:', error);
        }
        finally {
            avatarPopup.renderLoading(false);
        }
    }
);
avatarPopup.setEventListeners();


const editAvatarButton = document.querySelector('.profile__image-edit-button') as HTMLElement;
if (editAvatarButton) {
    editAvatarButton.addEventListener('click', () => {
        avatarPopup.open();
    });
}