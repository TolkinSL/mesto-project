import {user} from './index';
import {openPopup, closePopup, cardPopup} from './modal.js';
import {createNewCard, deleteCard, addLike, deleteLike} from "./api.js";

//Переменные для Создание карточек из Темплейта
export const elementsContainer = document.querySelector('.elements');

//Переменные Образа фото карточки
const elementTemplate = document.querySelector('#element-template').content;

//Переменные окна Картинка
export const imagePopup = document.querySelector('.popup_image');
const image = document.querySelector('.popup__image-foto');
const caption = document.querySelector('.popup__image-caption');

//Переменные добавления Новой фото карточки
export const cardFormAdd = document.querySelector('.popup__form-addcard');
const cardName = document.querySelector('#cardName');
const cardLink = document.querySelector('#cardLink');
const submitBtn = document.querySelector('#submitAddBtn');

//Функция перемещения карточки в Корзину
function movetoTrash(card) {
  const element = card.closest('.element');
  element.remove();
}

//Функция Создание карточек из Темплейта
export function createElement(data) {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementTitle = elementCard.querySelector('.element__title');
  const trashBtn = elementCard.querySelector('.element__trash-button');
  const likeBtn = elementCard.querySelector('.element__like-button');
  const likeNum = elementCard.querySelector('.element__like-num');

  elementImage.src = data.link;
  elementImage.alt = data.name;
  elementTitle.textContent = data.name;
  likeNum.textContent = data.likes.length;

  //Удаление своих карточек
  if (user._id === data.owner._id) {
    trashBtn.classList.add('element__trash-button_active');
    trashBtn.addEventListener('click', function () {
      deleteCard(data._id)
        .then(() => {
          movetoTrash(trashBtn);
        })
        .catch((err) => {
          console.error(err)
        })
    });
  }

  //Установка активных лайков на Карточке
  for (const item of data.likes) {
    if (item._id.includes(user._id)) {
      likeBtn.classList.add('element__like-button_active');
    }
  }

  //Установка новых лайков или снятие
  likeBtn.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('element__like-button_active')) {
      addLike(data._id)
        .then((data) => {
          evt.target.classList.add('element__like-button_active');
          likeNum.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      deleteLike(data._id)
        .then((data) => {
          evt.target.classList.remove('element__like-button_active');
          likeNum.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    }
  });

  elementImage.addEventListener('click', function () {
    openPopup(imagePopup);
    image.src = data.link;
    image.alt = data.name;
    caption.textContent = data.name;
  });

  return elementCard;
}

//Функция добавления Новой фото карточки
export function addNewCard (evt) {
  evt.preventDefault();
  submitBtn.textContent = 'Создание...';
  createNewCard(cardLink.value, cardName.value)
    .then((data) => {
      elementsContainer.prepend(createElement(data));
      closePopup(cardPopup);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      submitBtn.textContent = 'Создать';
    });
  cardFormAdd.reset();
  closePopup(cardPopup);
}
