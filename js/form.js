import {isEscapeKey} from './util.js';
import {setupPictureScale} from './form-picture-scale.js';
import {editEffect} from './form-picture-effects.js';

const uploadInput = document.querySelector('.img-upload__input');
const overlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const cancelBtn = document.querySelector('.img-upload__cancel');
const hashtagTemplate = /^#[a-zа-яё0-9]{1,19}$/i;
const hashtagsInput = document.querySelector('.text__hashtags');
const form = document.querySelector('.img-upload__form');


const closeUploadForm = () => {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  cancelBtn.removeEventListener('click', closeUploadForm);
  document.removeEventListener('keydown', handleKeyDown);
  uploadInput.value = '';
};


uploadInput.addEventListener('change', () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  setupPictureScale();
  editEffect();
  cancelBtn.addEventListener('click', closeUploadForm);
  document.addEventListener('keydown', handleKeyDown);
});


const validateHashtags = () => {
  console.log('Зашли прям внутрь');
  console.log(hashtagsInput.value);
  // const uniqueHashtags = new Set(hashtagsInput);
  // const hashtagsArray = Array.from(uniqueHashtags);

  // if (hashtagsArray.length > 5) {
  //   return false;
  // }

  // for (const hashtag of hashtagsArray) {
  //   if (!hashtagTemplate.test(hashtag) || hashtag.length > 20 || hashtag === '#') {
  //     return false;
  //   }
  // }

  return false;
};

const validateForm = () => {
  console.log('Зашли валидировать');
  console.log(hashtagsInput.value);
  const pristine = new Pristine(
    form,
    {
      classTo : 'img-upload__field-wrapper',
      errorTextParent : 'img-upload__field-wrapper',
      errorTextClass : 'img-upload__field-wrapper__error'
    });
  pristine.addValidator(hashtagsInput, validateHashtags,'Хештеги должны быть уникальны, длиной менее 20 символов, должен быть пробел между ними');
  return pristine.validate();
};


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  console.log(validateForm());
})

function handleKeyDown(evt) {
  if (isEscapeKey(evt)) {
    closeUploadForm();
  }
}


