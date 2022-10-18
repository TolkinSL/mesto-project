//Переменные окна Профайл
const profileBtnOpen = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const profileBtnClose = document.querySelector('#profile-cls-btn');

//Переменные окна Добавление карточек
const cardBtnOpen = document.querySelector('.profile__addcard-button');
const cardPopup = document.querySelector('.popup_addcard');
const cardBtnClose = document.querySelector('#addcard-cls-btn');

//Переменные окна Картинка
const imageBtnClose = document.querySelector('#image-cls-btn');
const imagePopup = document.querySelector('.popup_image');
const image = document.querySelector('.popup__image-foto');
const caption = document.querySelector('.popup__image-caption');

//Переменные редактирования Профайл
const profileForm = document.querySelector('.popup__form-profile');
const nameEdit = document.querySelector('#edit-name');
const infoEdit = document.querySelector('#edit-info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Переменные для Создание карточек из Темплейта
const elementsContainer = document.querySelector('.elements');

//Переменные добавления Новой фото карточки
const cardFormAdd = document.querySelector('.popup__form-addcard');
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-link');

//Переменные Образа фото карточки
const elementTemplate = document.querySelector('#element-template').content;

//Функция открытия Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

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

//Функция перемещения карточки в Корзину
function movetoTrash(card) {
  const element = card.closest('.element');
  element.remove();
}

//Функция Создание карточек из Темплейта
function createElement(imageValue,titleValue) {
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

//Создание карточек из массива initialCards
initialCards.forEach(function (data) {
  elementsContainer.prepend(createElement(data.link,data.name));
});

//Функция добавления Новой фото карточки
function addNewCard (evt) {
  evt.preventDefault();
  elementsContainer.prepend(createElement(cardLink.value,cardName.value));
  cardFormAdd.reset();
  closePopup(cardPopup);
}

cardFormAdd.addEventListener('submit',addNewCard);
