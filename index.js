const openProfileBtn = document.querySelector('.profile__edit-button');
const openProfilePopup = document.querySelector('.popup-profile');
const closeProfileBtn = document.querySelector('.popup-profile__close-button');

openProfileBtn.addEventListener('click', function() {
  openProfilePopup.classList.add('popup-profile_opened');
}
);

closeProfileBtn.addEventListener('click', function() {
  openProfilePopup.classList.remove('popup-profile_opened');
}
);

const openAddcardBtn = document.querySelector('.profile__addcard-button');
const openAddcardPopup = document.querySelector('.popup-addcard');
const closeAddcardBtn = document.querySelector('.popup-addcard__close-button');

openAddcardBtn.addEventListener('click', function() {
  openAddcardPopup.classList.add('popup-addcard_opened');
}
);

closeAddcardBtn.addEventListener('click', function() {
  openAddcardPopup.classList.remove('popup-addcard_opened');
}
);

// const openImageBtn = document.querySelector('.element__image');
// const openImagePopup = document.querySelector('.popup-image');
// const closeImageBtn = document.querySelector('.popup-image__close-button');

// openImageBtn.addEventListener('click', function() {
//   openImagePopup.classList.add('popup-image_opened');
// }
// );

// closeImageBtn.addEventListener('click', function() {
//   openImagePopup.classList.remove('popup-image_opened');
// }
// );

const profileForm = document.querySelector('.popup-profile__form');
const editName = document.querySelector('#edit-name');
const editInfo = document.querySelector('#edit-info');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


function changeProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = editName.value;
  profileSubtitle.textContent = editInfo.value;
  openProfilePopup.classList.remove('popup-profile_opened');
}

profileForm.addEventListener('submit',changeProfile);

//Создание карточек
const elementList = document.querySelector('.elements');

function createElement(imageValue,titleValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementTitle = elementCard.querySelector('.element__title');

  elementImage.src = imageValue;
  elementTitle.textContent = titleValue;

  console.log(imageValue,titleValue);

  return elementCard;
}

initialCards.forEach(function (data) {
  elementList.prepend(createElement(data.link,data.name));
});
