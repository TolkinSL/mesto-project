//Функция закрытия Popup Esc
function handleEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

//Функция закрытия Popup мышкой
function handleOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

//Функция открытия Popup
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  popup.addEventListener('mousedown', handleOverlay);
}

//Функция закрытия Popup
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscape);
  popup.removeEventListener('mousedown', handleOverlay);
}
