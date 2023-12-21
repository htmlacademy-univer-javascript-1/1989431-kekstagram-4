import { isEscapeKey, isPicture } from './util.js';
import { initScale, resetScale } from './picture-scale.js';
import { destroySlider, initSlider, resetFilterValue } from './picture-effects.js';
import { sendForm } from './form-send.js';
import { bodyElement } from './util.js';
import { ValidationErrorTexts } from './data.js';

const MAX_HASHTAG_LENGTH = 5;
const ONE_VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MULTIPLE_VALID_HASHTAGS = /(?:^|\s)(#[a-zа-яё0-9]{1,19})(?=\s|$)/gi;
const pictureUploadElement = bodyElement.querySelector('.img-upload__input');
const overlayElement = bodyElement.querySelector('.img-upload__overlay');
const cancelBtn = bodyElement.querySelector('.img-upload__cancel');
const hashtagsInput = bodyElement.querySelector('.text__hashtags');
const commentsInput = bodyElement.querySelector('.text__description');
const submitButton = bodyElement.querySelector('.img-upload__submit');
const imgUploadForm = bodyElement.querySelector('.img-upload__form');
let pristineValidator;

const onInputEscKeydown = (evt) => {
  const activeElement = document.activeElement;
  const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
  if (isEscapeKey(evt) && isInput) {
    evt.stopPropagation();
    activeElement.blur();
  }
};

const openUploadForm = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  imgUploadForm.addEventListener('keydown', onInputEscKeydown);
  cancelBtn.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', onDocumentKeyDown);
  imgUploadForm.addEventListener('submit', onImpUploadFormSubmit);
};

const clearInputs = () => {
  pictureUploadElement.value = '';
  hashtagsInput.value = '';
  commentsInput.value = '';
  if (pristineValidator){
    pristineValidator.destroy();
  }
};

const lockSubmitButton = () => {
  submitButton.disabled = true;
};

const unlockSubmitButton = () => {
  submitButton.disabled = false;
};

export function closeUploadForm (){
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  cancelBtn.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', onDocumentKeyDown);
  imgUploadForm.removeEventListener('keydown', onInputEscKeydown);
  imgUploadForm.removeEventListener('submit', onImpUploadFormSubmit);
  imgUploadForm.reset();
  clearInputs();
  resetScale();
  destroySlider();
  resetFilterValue();
  unlockSubmitButton();
}

export function onDocumentKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeUploadForm();
  }
}

const validateHashtagsLength = (hashtagString) => hashtagString.split(' ').length <= MAX_HASHTAG_LENGTH;

const validateHashtagUniqness = (hashtagString) => {
  const hashtags = hashtagString.toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagFormat = (hashtagString) => {
  if (hashtagString === '') {
    return true;
  }

  if (hashtagString === '#') {
    return false;
  }
  const hashtagCount = hashtagString.split('#').length - 1;

  if (hashtagCount === 1) {
    return ONE_VALID_HASHTAG.test(hashtagString);
  }

  return MULTIPLE_VALID_HASHTAGS.test(hashtagString);
};

const validateComments = (commentsString) => commentsString.length <= 140;

function onImpUploadFormSubmit (evt) {
  evt.preventDefault();
  pristineValidator = new Pristine(
    imgUploadForm,
    {
      classTo : 'img-upload__field-wrapper',
      errorTextParent : 'img-upload__field-wrapper',
      errorTextClass : 'img-upload__field-wrapper__error'
    });
  pristineValidator.addValidator(hashtagsInput, validateHashtagsLength, ValidationErrorTexts.MAX_HASHTAGS_COUNT);
  pristineValidator.addValidator(hashtagsInput, validateHashtagUniqness, ValidationErrorTexts.UNIQ_HASHTAGS);
  pristineValidator.addValidator(hashtagsInput, validateHashtagFormat, ValidationErrorTexts.INVALID_HASHTAG);
  pristineValidator.addValidator(commentsInput, validateComments, ValidationErrorTexts.MAX_COMMENT_LENGTH);

  if (pristineValidator.validate()){
    lockSubmitButton();
    sendForm();
  }
}

const onPictureUploadClick = (evt) => {
  if (isPicture(evt)){
    openUploadForm();
    initScale();
    initSlider();
  }
};

export const initEditPopup = () => {
  pictureUploadElement.addEventListener('change', onPictureUploadClick);
};
