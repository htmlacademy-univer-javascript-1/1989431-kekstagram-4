import { FilterParameter } from './util.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const effectSliderWrap = imgUploadOverlay.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUploadOverlay.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
const uploadImage = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const effectsListItems = imgUploadOverlay.querySelectorAll('.effects__radio');

export const resetFilterValue = () => {
  uploadImage.style.filter = 'none';
  effectSliderWrap.classList.add('hidden');
};

const onEffectClick = (evt) => {
  const effect = evt.target.value;
  if (effect === 'none'){
    resetFilterValue();
  } else {
    uploadImage.removeAttribute('class');
    uploadImage.classList.add(`effects__preview--${effect}`);
    effectSliderWrap.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(FilterParameter[effect].options);
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();
      uploadImage.style.filter = `${FilterParameter[effect].filter}(${effectLevelValue.value}${FilterParameter[effect].units})`;
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
  effectsListItems.forEach((effect) => {
    effect.addEventListener('click', onEffectClick);
  });
};

export const destroySlider = () => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  effectsListItems.forEach((effect) => {
    effect.removeEventListener('click', onEffectClick);
  });
};
