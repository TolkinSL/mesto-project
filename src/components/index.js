import '../pages/index.css';
import {validSetting} from './data.js';
import {enableValidation, disableSubmitBtn} from './validate.js';
import {createElement, elementsContainer} from './card.js';
import {openPopup, closePopup,} from './modal.js';
import {getSrvUser, getSrvCards, editProfile, changeAvatar, createNewCard} from "./api.js";

//Переменные окна Avatar
const avatarPopup = document.querySelector('.popup_avatar');
const avatarForm = document.forms['form-avatar'];
const avatarPhotoInput = avatarForm.querySelector(".popup__input");
const avatarSubmitBtn = avatarForm.querySelector('.popup__button');

//Переменные редактирования Профайл
const profileBtnOpen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const profileForm = document.forms['form-profile'];
const profileNameInput = document.querySelector('#editName');
const profileInfoInput = document.querySelector('#editInfo');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const profileSubmitBtn = profileForm.querySelector('.popup__button');

//Переменные добавления Новой фото карточки
const cardBtnOpen = document.querySelector('.profile__addcard-button');
const cardPopup = document.querySelector('.popup_addcard');
const cardFormAdd = document.forms['form-card'];
const cardName = document.querySelector('#cardName');
const cardLink = document.querySelector('#cardLink');
const cardSubmitBtn = cardFormAdd.querySelector('.popup__button');

//Переменные находим все крестики (X) проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close-button');

//Данные пользователя
let user = {};

//Функция Загрузки данных и карточек с сервера
Promise.all([getSrvUser(), getSrvCards()])
  .then(([srvUser, cards]) => {
    user = srvUser;
    profileTitle.textContent = user.name;
    profileSubtitle.textContent = user.about;
    profileAvatar.src = user.avatar;

    cards.reverse().forEach((data) => {
      elementsContainer.prepend(createElement(data, user));
    })
  })
  .catch((err) => {
    console.error(err);
  })

//Функция редактирования Профайл
function changeProfile (evt) {
  evt.preventDefault();
  profileSubmitBtn.textContent = 'Сохранение...';
  editProfile(profileNameInput.value, profileInfoInput.value)
    .then(() => {
      profileTitle.textContent = profileNameInput.value;
      profileSubtitle.textContent = profileInfoInput.value;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
    });

}

//функция изменения аватарки пользователя
function changeAvatarProfile(evt) {
  evt.preventDefault();
  avatarSubmitBtn.textContent = 'Сохранение...';
  const avatar = avatarPhotoInput.value;
  changeAvatar(avatar)
    .then((item) => {
      profileAvatar.src = item.avatar;
      // avatarForm.reset();
      evt.target.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      avatarSubmitBtn.textContent = 'Сохранить';
    })
}

//Функция добавления Новой фото карточки
function addNewCard (evt) {
  evt.preventDefault();
  cardSubmitBtn.textContent = 'Создание...';
  createNewCard(cardLink.value, cardName.value)
    .then((data) => {
      elementsContainer.prepend(createElement(data, user));
      // cardFormAdd.reset();
      evt.target.reset();
      closePopup(cardPopup);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      cardSubmitBtn.textContent = 'Создать';
    });
}

//-------------------------------------------------------------------
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
  profileNameInput.value = profileTitle.textContent;
  profileInfoInput.value = profileSubtitle.textContent;
});

//Открытие окна Avatar
profileAvatar.addEventListener('click', function() {
  openPopup(avatarPopup);
});

//Открытие окна Добавление карточек
cardBtnOpen.addEventListener('click', function() {
  openPopup(cardPopup);
});

//слушатель на кнопку Submit в форме Профайл
profileForm.addEventListener('submit',changeProfile);

//слушатель на кнопку Submit в форме Добавление карточек
cardFormAdd.addEventListener('submit', addNewCard);

//слушатель на кнопку Submit в форме изменения аватара
avatarForm.addEventListener('submit', changeAvatarProfile);

enableValidation(validSetting);
