import {openPopup, closePopup, cardPopup} from './modal.js';

//Переменные добавления Новой фото карточки
export const cardFormAdd = document.querySelector('.popup__form-addcard');
const cardName = document.querySelector('#cardName');
const cardLink = document.querySelector('#cardLink');

//Переменные для Создание карточек из Темплейта
export const elementsContainer = document.querySelector('.elements');

//Переменные Образа фото карточки
const elementTemplate = document.querySelector('#element-template').content;

//Переменные окна Картинка
export const imagePopup = document.querySelector('.popup_image');
const image = document.querySelector('.popup__image-foto');
const caption = document.querySelector('.popup__image-caption');

//Функция перемещения карточки в Корзину
function movetoTrash(card) {
  const element = card.closest('.element');
  element.remove();
}

//Функция Создание карточек из Темплейта
export function createElement(imageValue,titleValue) {
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementTitle = elementCard.querySelector('.element__title');
  const trashBtn = elementCard.querySelector('.element__trash-button');
  const likeBtn = elementCard.querySelector('.element__like-button');

  elementImage.src = imageValue;
  elementImage.alt = titleValue;
  elementTitle.textContent = titleValue;

  trashBtn.addEventListener('click', function () {
    movetoTrash(trashBtn);
  });

  likeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  elementImage.addEventListener('click', function () {
    openPopup(imagePopup);
    image.src = imageValue;
    image.alt = titleValue;
    caption.textContent = titleValue;
  });

  return elementCard;
}

//Функция добавления Новой фото карточки
export function addNewCard (evt) {
  evt.preventDefault();
  elementsContainer.prepend(createElement(cardLink.value,cardName.value));
  cardFormAdd.reset();
  closePopup(cardPopup);
}
