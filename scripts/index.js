const initialCards = [
    {name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"},
    {name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"},
    {name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"},
    {name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"},
    {name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"},
    {name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"}
];


const editButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const editPopupModal = document.querySelector('#edit-popup');
const newCardPopUpModal = document.querySelector("#new-card-popup");
const imagePopUpModal = document.querySelector("#image-popup");
const popUpImage = imagePopUpModal.querySelector(".popup__image");
const imageCaption = imagePopUpModal.querySelector(".popup__caption");
const formElement = document.querySelectorAll('.popup__form');
const cardTemplate = document.querySelector('#card_template');
const cardList = document.querySelector('.cards__list');


function openModal(modal){
    modal.classList.add('popup_is-opened');
}


function closeModal(modal){
    modal.classList.remove('popup_is-opened');
}


editButton.addEventListener('click', function(){
    handleOpenEditModal();
});

addCardButton.addEventListener("click",function(){
    openModal(newCardPopUpModal);
})


closeButton.forEach((popUpCloseBtn) => {
    popUpCloseBtn.addEventListener("click",function(evt){
        closeModal(evt.target.closest(".popup"))
    });
});


function fillProfileForm(){
    const profileName = document.querySelector('.profile__title').textContent;
    const profileDescription = document.querySelector('.profile__description').textContent;
    const nameInput = document.querySelector('.popup__input_type_name');
    const descriptionInput = document.querySelector('.popup__input_type_description');

    nameInput.value = profileName;
    descriptionInput.value = profileDescription;
};


function handleOpenEditModal(){
    fillProfileForm();
    openModal(editPopupModal);
}


function handleProfileFormSubmit(evt){
    evt.preventDefault();

    const nameInput = document.querySelector('.popup__input_type_name');
    const descriptionInput = document.querySelector('.popup__input_type_description');
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closeModal(editPopupModal);
};


function handleCardFormSubmit(evt){
    evt.preventDefault();

    const nameInput = document.querySelector('.popup__input_type_card-name');
    const linkInput = document.querySelector('.popup__input_type_url');

    renderCard(nameInput.value,linkInput.value,cardList);

    evt.target.reset();
    closeModal(newCardPopUpModal);
};


function getCardElement(name="Sin título",link="./images/placeholder.jpg"){
    const cardElement = cardTemplate.content.cloneNode(true);

    const cardName = cardElement.querySelector(".card__title");
    cardName.textContent = name;

    const cardImageLink = cardElement.querySelector(".card__image");
    cardImageLink.src = link;
    cardImageLink.addEventListener("click",function(){
        popUpImage.src = link;
        popUpImage.alt = name;
        imageCaption.textContent = name;
        openModal(imagePopUpModal);
    });

    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click",function(){
        likeButton.classList.toggle("card__like-button_is-active");
    });

    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", function(evt) {
        evt.target.closest(".card").remove();
    });

    cardImageLink.alt = name;

    return cardElement;
};


function renderCard(name,link,container){
    const nCardElement = getCardElement(name,link);
    container.prepend(nCardElement);
};


initialCards.forEach((card) =>{
    renderCard(card.name, card.link, cardList);
});

