const body = document.querySelector('body');

const scaleControlValue = body.querySelector('.scale__control--value');
const scaleControlSmallerButton = body.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = body.querySelector('.scale__control--bigger');

const imgUploadPreview = body.querySelector('.img-upload__preview').querySelector('img');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;

let scaleValue = Number(scaleControlValue.value.slice(0, -1));

const updateScaleStyles = () => {
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
};

const resetScale = () => {
  scaleControlValue.value = '100%';
  scaleValue = 100;
};

scaleControlSmallerButton.addEventListener('click', () => {
  if (scaleValue > MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
    updateScaleStyles();
  }
});

scaleControlBiggerButton.addEventListener('click', () => {
  if (scaleValue < MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
    updateScaleStyles();
  }
});

export { updateScaleStyles, resetScale};
