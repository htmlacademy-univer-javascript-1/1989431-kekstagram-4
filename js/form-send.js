import { createSender } from './api.js';
import { isEscapeKey, bodyElement } from './util.js';
import { closeUploadForm, onDocumentKeyDown } from './form.js';

const POPUP_STATUS_Z_INDEX = 2;
const imgUploadForm = bodyElement.querySelector('.img-upload__form');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let popupSendStatus;

const closeStatusPopup = () => {
  popupSendStatus.classList.add('hidden');
};

const onErrorEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeStatusPopup();
    document.addEventListener('keydown', onDocumentKeyDown);
    document.removeEventListener('keydown', onErrorEscKeyDown);
  }
};

const showStatusMessage = (isSendSuccesfull) => {
  if (isSendSuccesfull) {
    popupSendStatus = successTemplate.cloneNode(true);
    closeUploadForm();
  }
  else {
    popupSendStatus = errorTemplate.cloneNode(true);
    document.removeEventListener('keydown', onDocumentKeyDown);
    document.addEventListener('keydown', onErrorEscKeyDown);
  }
  popupSendStatus.style.zIndex = POPUP_STATUS_Z_INDEX;
  popupSendStatus.classList.remove('hidden');
  bodyElement.appendChild(popupSendStatus);
};

const closeSendingForm = () => {
  closeStatusPopup();
};

const onSuccessBtnClick = () => closeSendingForm();

const onErrorBtnClick = () => closeStatusPopup();

const onSuccessfullSend = () => {
  showStatusMessage(true);
  popupSendStatus.addEventListener('click', onSuccessBtnClick);
};

const onFailedSend = () => {
  showStatusMessage(false);
  popupSendStatus.addEventListener('click', onErrorBtnClick);
};

const onFormEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeStatusPopup();
    if (popupSendStatus.classList.contains('success')) {
      closeUploadForm();
    }
    imgUploadForm.removeEventListener('keydown', onFormEscKeyDown);
  }
};

export const sendForm = () => {
  createSender(new FormData(imgUploadForm), onSuccessfullSend, onFailedSend);
  imgUploadForm.addEventListener('keydown', onFormEscKeyDown);
};
