//Переменные окна Профайл
const openProfileBtn = document.querySelector('.profile__edit-button');
const openProfilePopup = document.querySelector('.popup-profile');
const closeProfileBtn = document.querySelector('.popup-profile__close-button');

//Переменные окна Добавление карточек
const openAddcardBtn = document.querySelector('.profile__addcard-button');
const openAddcardPopup = document.querySelector('.popup-addcard');
const closeAddcardBtn = document.querySelector('.popup-addcard__close-button');

//Переменные окна Картинка
const openImagePopup = document.querySelector('.popup-image');
const closeImageBtn = document.querySelector('.popup-image__close-button');

//Переменные редактирования Профайл
const profileForm = document.querySelector('.popup-profile__form');
const editName = document.querySelector('#edit-name');
const editInfo = document.querySelector('#edit-info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Переменные для Создание карточек из Темплейта
const elementList = document.querySelector('.elements');

//Переменные добавления Новой фото карточки
const addCardForm = document.querySelector('.popup-addcard__form');
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-link');

//Открытие окна Профайл
openProfileBtn.addEventListener('click', function() {
  openProfilePopup.classList.add('popup-profile_opened');
  editName.value = profileTitle.textContent;
  editInfo.value = profileSubtitle.textContent;
});
//Закрытие окна Профайл
closeProfileBtn.addEventListener('click', function() {
  openProfilePopup.classList.remove('popup-profile_opened');
});

//Открытие окна Добавление карточек
openAddcardBtn.addEventListener('click', function() {
  openAddcardPopup.classList.add('popup-addcard_opened');
});
//Закрытие окна Добавление карточек
closeAddcardBtn.addEventListener('click', function() {
  openAddcardPopup.classList.remove('popup-addcard_opened');
});

//Закрытие окна Картинка
closeImageBtn.addEventListener('click', function() {
  openImagePopup.classList.remove('popup-image_opened');
});

//Функция редактирования Профайл
function changeProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = editName.value;
  profileSubtitle.textContent = editInfo.value;
  openProfilePopup.classList.remove('popup-profile_opened');
}

profileForm.addEventListener('submit',changeProfile);

//Функция Создание карточек из Темплейта
function createElement(imageValue,titleValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementTitle = elementCard.querySelector('.element__title');
  const trashBtn = elementCard.querySelector('.element__trash-button');
  const likeBtn = elementCard.querySelector('.element__like-button');

  elementImage.src = imageValue;
  elementTitle.textContent = titleValue;

  trashBtn.addEventListener('click', function () {
    const element = trashBtn.closest('.element');
    element.remove();
  });

  likeBtn.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  elementImage.addEventListener('click', function () {
    const imagePopup = document.querySelector('.popup-image');
    const image = document.querySelector('.popup-image__foto');
    const caption = document.querySelector('.popup-image__caption');

    imagePopup.classList.add('popup-image_opened');
    image.src = imageValue;
    caption.textContent = titleValue;
  });

  return elementCard;
}

//Создание карточек из массива initialCards
initialCards.forEach(function (data) {
  elementList.prepend(createElement(data.link,data.name));
});

//Функция добавления Новой фото карточки
function addNewCard (evt) {
  evt.preventDefault();
  elementList.prepend(createElement(cardLink.value,cardName.value));
  addCardForm.reset();
  openAddcardPopup.classList.remove('popup-addcard_opened');
}

addCardForm.addEventListener('submit',addNewCard);
