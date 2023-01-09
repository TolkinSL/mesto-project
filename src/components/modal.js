export const cardPopup = document.querySelector('.popup_addcard');

//Функция закрытия Popup Esc
function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//Функция закрытия Popup мышкой
function closeMouse(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

//Функция открытия Popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  popup.addEventListener('mousedown', closeMouse);
}

//Функция закрытия Popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  popup.removeEventListener('mousedown', closeMouse);
}
