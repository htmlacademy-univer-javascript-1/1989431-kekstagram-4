import { bodyElement } from './util.js';
import { MIN_SCALE, MAX_SCALE, SCALE_STEP } from './data.js';

const scaleControlValue = bodyElement.querySelector('.scale__control--value');
const uploadImage = bodyElement.querySelector('.img-upload__preview').querySelector('img');
const smallerScaleButton = bodyElement.querySelector('.scale__control--smaller');
const biggerScaleButton = bodyElement.querySelector('.scale__control--bigger');

let currentScale = MAX_SCALE;

const updateScaleStyles = () => {
  const scaleValue = currentScale / MAX_SCALE;
  uploadImage.style.transform = `scale(${scaleValue})`;
};

const onSmallerScaleButtonClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    updateScaleStyles();
  }
};

const onBiggerScaleButtonClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    scaleControlValue.value = `${currentScale}%`;
    updateScaleStyles();
  }
};

const onScaleControlValueInput = () => {
  const inputValue = parseInt(scaleControlValue.value, 10);
  if (!isNaN(inputValue) && inputValue >= MIN_SCALE && inputValue <= MAX_SCALE) {
    currentScale = inputValue;
    updateScaleStyles();
  }
};

export const initScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  smallerScaleButton.addEventListener('click', onSmallerScaleButtonClick);
  biggerScaleButton.addEventListener('click', onBiggerScaleButtonClick);
  scaleControlValue.addEventListener('input', onScaleControlValueInput);
};

export const resetScale = () => {
  currentScale = MAX_SCALE;
  smallerScaleButton.removeEventListener('click', onSmallerScaleButtonClick);
  biggerScaleButton.removeEventListener('click', onBiggerScaleButtonClick);
  scaleControlValue.removeEventListener('input', onScaleControlValueInput);
};
