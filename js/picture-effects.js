import { FiltersParameters } from './util.js';

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const sliderContainer = imgUploadOverlay.querySelector('.img-upload__effect-level');
const effectLevelSlider = imgUploadOverlay.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
const effectsList = imgUploadOverlay.querySelectorAll('.effects__radio');

hideSlider();

noUiSlider.create(effectLevelSlider, {
  connect: 'lower',
  range: {
    min: 0,
    max: 100
  },
  start: 0,
  step: 1
});

for (const effectItem of effectsList) {
  effectItem.addEventListener('change', () => {
    if (effectItem.value === 'none') {
      hideSlider();
    }

    else {
      const effect = FiltersParameters[effectItem.value];

      effectLevelSlider.noUiSlider.updateOptions({
        range: {
          min: effect.options.range.min,
          max: effect.options.range.max,
        },
        start: effect.options.start,
        step: effect.options.step,
      });

      showSlider();
      updateStyle(`${effect.filter}(${effectLevelValue.value}${effect.units})`);
      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue.value = effectLevelSlider.noUiSlider.get();
        updateStyle(`${effect.filter}(${effectLevelValue.value}${effect.units})`);
      });
    }
  });
}

function showSlider() {
  sliderContainer.classList.remove('hidden');
}

function hideSlider() {
  sliderContainer.classList.add('hidden');
  updateStyle(null);
}

function updateStyle(value) {
  imgUploadPreview.style.filter = value;
}

export {hideSlider};


