import '../pages/index.css';
import {initialCards} from './data.js';
import {enableValidation} from './validate.js';
import {addNewCard, createElement, cardFormAdd, elementsContainer, imagePopup} from './card.js';
import {openPopup, closePopup, cardPopup} from './modal.js';

//Переменные окна Профайл
const profileBtnOpen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const profileBtnClose = document.querySelector('#profile-cls-btn');

//Переменные окна Добавление карточек
const cardBtnOpen = document.querySelector('.profile__addcard-button');
const cardBtnClose = document.querySelector('#addcard-cls-btn');

//Переменные окна Картинка
const imageBtnClose = document.querySelector('#image-cls-btn');

//Переменные редактирования Профайл
const profileForm = document.querySelector('.popup__form-profile');
const nameEdit = document.querySelector('#editName');
const infoEdit = document.querySelector('#editInfo');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Открытие окна Профайл
profileBtnOpen.addEventListener('click', function() {
  openPopup(profilePopup);
  nameEdit.value = profileTitle.textContent;
  infoEdit.value = profileSubtitle.textContent;
});

//Закрытие окна Профайл
profileBtnClose.addEventListener('click', function() {
  closePopup(profilePopup);
});

//Открытие окна Добавление карточек
cardBtnOpen.addEventListener('click', function() {
  openPopup(cardPopup);
});

//Закрытие окна Добавление карточек
cardBtnClose.addEventListener('click', function() {
  closePopup(cardPopup);
});

//Закрытие окна Картинка
imageBtnClose.addEventListener('click', function() {
  closePopup(imagePopup);
});

//Функция редактирования Профайл
function changeProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameEdit.value;
  profileSubtitle.textContent = infoEdit.value;
  closePopup(profilePopup);
}

profileForm.addEventListener('submit',changeProfile);

//Создание карточек из массива initialCards
initialCards.forEach(function (data) {
  elementsContainer.prepend(createElement(data.link,data.name));
});

cardFormAdd.addEventListener('submit',addNewCard);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
