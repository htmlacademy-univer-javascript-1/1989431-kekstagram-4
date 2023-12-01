import {isEscapeKey} from './util.js';
import {setupPictureScale} from './form-picture-scale.js';
import {editEffect} from './form-picture-effects.js';

const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
const patternWithSpaces = /(?:^|\s)(#[a-zа-яё0-9]{1,19})(?=\s|$)/gi;
const MAX_HASHTAG_LENGTH = 5;
const uploadInput = document.querySelector('.img-upload__input');
const overlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const cancelBtn = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentsInput = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');

const onInputElementEscPress = (evt) => {
  const activeElement = document.activeElement;
  const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
  if (isEscapeKey(evt) && isInput) {
    evt.stopPropagation();
    activeElement.blur();
  }
};

const closeUploadForm = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  cancelBtn.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', handleKeyDown);
  form.removeEventListener('keydown', onInputElementEscPress);
  uploadInput.value = '';
  hashtagsInput.value = '';
  commentsInput.value = '';
};


uploadInput.addEventListener('change', () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  form.addEventListener('keydown', onInputElementEscPress);
  setupPictureScale();
  editEffect();
  cancelBtn.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', handleKeyDown);
});


const validateHashtagsLength = (hashtagString) => hashtagString.split(' ').length <= MAX_HASHTAG_LENGTH;

const validateHashtagUniqness = (hashtagString) => {
  const hashtagsArray = hashtagString.toLowerCase().split(' ');
  return hashtagsArray.length === new Set(hashtagsArray).size;
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
    return validHashtag.test(hashtagString);
  }

  return patternWithSpaces.test(hashtagString);
};


const validateComments = (commentsString) => commentsString.length <= 140;

const validateForm = () => {
  const pristine = new Pristine(
    form,
    {
      classTo : 'img-upload__field-wrapper',
      errorTextParent : 'img-upload__field-wrapper',
      errorTextClass : 'img-upload__field-wrapper__error'
    });
  pristine.addValidator(hashtagsInput, validateHashtagsLength,'Нельзя указывать больше 5 хештегов');
  pristine.addValidator(hashtagsInput, validateHashtagUniqness,'Хештеги не должны повторяться');
  pristine.addValidator(hashtagsInput, validateHashtagFormat,'Невалидный формат хештега');
  pristine.addValidator(commentsInput, validateComments, 'Длина комментария должна быть меньше 140 символов');

  return pristine.validate();
};


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  validateForm();
});


function handleKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeUploadForm();
  }
}


