//Регистрация на сервере
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: '5f20eae2-a435-471a-9c3c-f84664c6d5fe',
    'Content-Type': 'application/json'
  }
};

//Проверка ответа
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Получение данных о пользователе
export const getSrvUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

//Загрузка карточек с сервера
export const getSrvCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
}

//Редактирование аватара
export const changeAvatar = (photo) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: photo
    })
  })
    .then(checkResponse);
}

//Редактирование имени и деятельности
export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse);
}

//Добавление карточки
export const createNewCard = (link, name) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse);
}

//Удаление карточки
export const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}

//Добавление лайка
export const addLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(checkResponse);
}

//Удаление лайка
export const deleteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}
