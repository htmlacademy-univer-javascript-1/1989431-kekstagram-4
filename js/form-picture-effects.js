
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');


export const editEffect = () => {
  noUiSlider.create(effectLevelSlider, {
    start: 100,
    step: 0.1,
    range: {
      min: 0,
      max: 100
    }
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  });
};

