const scaleControlValue = document.querySelector('.scale__control--value');
const uploadImage = document.querySelector('.img-upload__preview').querySelector('img');
const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');

let currentScale = 100;


const updateScaleStyles = () => {
  const scaleValue = currentScale / 100;
  uploadImage.style.transform = `scale(${scaleValue})`;
};


const OnSmallerScaleButtonClick = () => {
  if (currentScale > 25) {
    currentScale -= 25;
    scaleControlValue.value = `${currentScale}%`;
    updateScaleStyles();
  }
};

const OnBiggerScaleButtonClick = () => {
  if (currentScale < 100) {
    currentScale += 25;
    scaleControlValue.value = `${currentScale}%`;
    updateScaleStyles();
  }
};


const onScaleControlValueInput = () => {
  const inputValue = parseInt(scaleControlValue.value, 10);
  if (!isNaN(inputValue) && inputValue >= 25 && inputValue <= 100) {
    currentScale = inputValue;
    updateScaleStyles();
  }
};

export const initScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  smallerScaleButton.addEventListener('click', OnSmallerScaleButtonClick);
  biggerScaleButton.addEventListener('click', OnBiggerScaleButtonClick);
  scaleControlValue.addEventListener('input', onScaleControlValueInput);
};

export const resetScale = () => {
  currentScale = 100;
  smallerScaleButton.removeEventListener('click', OnSmallerScaleButtonClick);
  biggerScaleButton.removeEventListener('click', OnBiggerScaleButtonClick);
  scaleControlValue.removeEventListener('input', onScaleControlValueInput);
};

