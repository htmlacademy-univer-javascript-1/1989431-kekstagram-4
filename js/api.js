const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

export const ErrorText = {
  GET_DATA : 'Не удалось загрузить данные. Попробуйте обновить страницу.',
  SEND_DATA : 'Не удалось отправить форму. Попробуйте еще раз.'
};

export const createLoader = (onSuccess, onError) => fetch(
  `${BASE_URL}/data`,
  {
    method : 'GET',
    credentials : 'same-origin',
  },
)
  .then((response) => {
    if (response.ok){
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => onSuccess(data))
  .catch((err) => {
    onError(err);
  });

export const createSender = (body, onSuccess, onError) => fetch(
  `${BASE_URL}/`,
  {
    method : 'POST',
    credentials : 'same-origin',
    body
  },
)
  .then((response) => {
    if (response.ok){
      return response.json;
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => onSuccess(data))
  .catch((err) => {
    onError(err);
  });
