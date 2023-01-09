import '../pages/index.css';
import {initialCards, validSetting} from './data.js';
import {enableValidation, disableSubmitBtn} from './validate.js';
import {addNewCard, createElement, cardFormAdd, elementsContainer, imagePopup} from './card.js';
import {openPopup, closePopup, cardPopup} from './modal.js';

//Переменные окна Профайл
const profileBtnOpen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');

//Переменные окна Добавление карточек
const cardBtnOpen = document.querySelector('.profile__addcard-button');
const submitBtn = document.querySelector('#submitAddBtn');

//Переменные редактирования Профайл
const profileForm = document.querySelector('.popup__form-profile');
const nameEdit = document.querySelector('#editName');
const infoEdit = document.querySelector('#editInfo');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Переменные находим все крестики (X) проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');


//Функция закрытия всех Popup через (Х)
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//Открытие окна Профайл
profileBtnOpen.addEventListener('click', function() {
  openPopup(profilePopup);
  nameEdit.value = profileTitle.textContent;
  infoEdit.value = profileSubtitle.textContent;
});

//Открытие окна Добавление карточек
cardBtnOpen.addEventListener('click', function() {
  openPopup(cardPopup);
  disableSubmitBtn(validSetting, submitBtn);
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

enableValidation(validSetting);
