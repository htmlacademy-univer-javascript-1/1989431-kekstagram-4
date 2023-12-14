import { PICTURE_EFFECTS_PARAMS } from './util.js';

const bodyElement = document.querySelector('.body');
const effectSliderWrap = bodyElement.querySelector('.img-upload__effect-level');
const effectLevelSlider = bodyElement.querySelector('.effect-level__slider');
const effectLevelValue = bodyElement.querySelector('.effect-level__value');
const uploadImage = bodyElement.querySelector('.img-upload__preview').querySelector('img');
const effectsListItems = bodyElement.querySelectorAll('.effects__radio');


const resetFilterValue = () => {
  uploadImage.style.filter = 'none';
  effectSliderWrap.classList.add('hidden');
};

const onEffectsClick = (evt) => {
  const effect = evt.target.value;
  if (effect === 'none'){
    resetFilterValue();
  } else{
    uploadImage.removeAttribute('class');
    uploadImage.classList.add(`effects__preview--${effect}`);
    effectSliderWrap.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(PICTURE_EFFECTS_PARAMS[effect].options);
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      uploadImage.style.filter = `${PICTURE_EFFECTS_PARAMS[effect].filter}(${effectLevelValue.value}${PICTURE_EFFECTS_PARAMS[effect].units})`;
    });
  }
};

export const initSlider = () => {
  effectSliderWrap.classList.add('hidden');
  noUiSlider.create(effectLevelSlider, {
    start: 100,
    step: 0.1,
    range: {
      min: 0,
      max: 100
    }
  });
  effectsListItems.forEach((item) => {
    item.addEventListener('click', onEffectsClick);
  });
};

export const destroySlider = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  effectsListItems.forEach((item) => {
    item.removeEventListener('click', onEffectsClick);
  });
};

