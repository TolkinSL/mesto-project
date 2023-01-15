import {openPopup} from './modal.js';
import {deleteCard, addLike, deleteLike} from "./api.js";

//Переменные для Создание карточек из Темплейта
export const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

//Переменные окна Картинка
const imagePopup = document.querySelector('.popup_image');
const imageFoto = document.querySelector('.popup__image-foto');
const imageCaption = document.querySelector('.popup__image-caption');

//Функция перемещения карточки в Корзину
function removeCard(card) {
  const element = card.closest('.element');
  element.remove();
}

//Функция Создание карточек из Темплейта
export function createElement(data, user) {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementTitle = elementCard.querySelector('.element__title');
  const elementTrashBtn = elementCard.querySelector('.element__trash-button');
  const elementLikeBtn = elementCard.querySelector('.element__like-button');
  const elementLikeNum = elementCard.querySelector('.element__like-num');

  elementImage.src = data.link;
  elementImage.alt = data.name;
  elementTitle.textContent = data.name;
  elementLikeNum.textContent = data.likes.length;

  //Удаление своих карточек
  if (user._id === data.owner._id) {
    elementTrashBtn.classList.add('element__trash-button_active');
    elementTrashBtn.addEventListener('click', function () {
      deleteCard(data._id)
        .then(() => {
          removeCard(elementTrashBtn);
        })
        .catch((err) => {
          console.error(err)
        })
    });
  }

  //Установка активных лайков на Карточке
  for (const item of data.likes) {
    if (item._id.includes(user._id)) {
      elementLikeBtn.classList.add('element__like-button_active');
    }
  }

  //Установка новых лайков или снятие
  elementLikeBtn.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('element__like-button_active')) {
      addLike(data._id)
        .then((data) => {
          evt.target.classList.add('element__like-button_active');
          elementLikeNum.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      deleteLike(data._id)
        .then((data) => {
          evt.target.classList.remove('element__like-button_active');
          elementLikeNum.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    }
  });

  elementImage.addEventListener('click', function () {
    openPopup(imagePopup);
    imageFoto.src = data.link;
    imageFoto.alt = data.name;
    imageCaption.textContent = data.name;
  });

  return elementCard;
}

