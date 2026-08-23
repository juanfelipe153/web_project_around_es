

const initialCards = [
    {name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"},
    {name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"},
    {name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"},
    {name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"},
    {name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"},
    {name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"}
];


initialcards.forEach(function(card){
    console.log(card.name);
});

const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const editPopupModal = document.querySelector('#edit-popup');
const formElement = document.querySelector('.popup__form');

function openModal(modal){
    modal.classList.add('popup_is-opened');    
}

function closeModal(modal){
    modal.classList.remove('popup_is-opened');
}

editButton.addEventListener('click', function(){
    handleOpenEditModal();    
});

closeButton.addEventListener("click",function(){
    closeModal(editPopupModal);
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

formElement.addEventListener('submit', handleProfileFormSubmit);



