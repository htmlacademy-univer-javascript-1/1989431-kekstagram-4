import {getPhotos} from './data.js';
import { initEditPopup } from './form.js';
import {thumbnailsInit} from './thumbnails.js';
import { createUploadErrorMessage } from './util.js';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const bodyElement = document.querySelector('.body');

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

export const onDataSuccessRecieve = () => {
  const photos = getPhotos();
  thumbnailsInit(photos);
  initEditPopup();
};

export const onDataFailedRecieve = (err) => {
  const uploadErrorMessage = createUploadErrorMessage(err);
  bodyElement.append(uploadErrorMessage);
};

export const createSender = (body, onSuccess, onError) => fetch(
  `${BASE_URL}/`,
  {
    method : 'POST',
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

