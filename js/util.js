const TIMOUT_DELAY = 500;
const MESSAGE_SHOW_TIME = 5000;

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const FiltersParameters = {
  'none' : {name : 'none', filter : '', units : '',
    options : {range : {min : 0, max : 100}, step : 1, start : 100}},
  'chrome' : {name : 'chrome', filter : 'grayscale', units : '',
    options : {range : {min : 0, max : 1}, step : 0.1, start : 1}},
  'sepia' : {name : 'sepia', filter : 'sepia', units : '',
    options : {range : {min : 0, max : 1}, step : 0.1, start : 1}},
  'marvin' : {name : 'marvin', filter : 'invert', units : '%',
    options : {range : {min : 0, max : 100}, step : 1, start : 100}},
  'phobos' : {name : 'phobos', filter : 'blur', units : 'px',
    options : {range : {min : 0, max : 3}, step : 0.1, start : 3}},
  'heat' : {name : 'heat', filter : 'brightness', units : '',
    options : {range : {min : 1, max : 3}, step : 0.1, start : 3}},
};

const showUploadErrorMessage = (message) => {
  const uploadErrorMessageContainer = document.createElement('div');

  uploadErrorMessageContainer.style.position = 'absolute';
  uploadErrorMessageContainer.style.left = 0;
  uploadErrorMessageContainer.style.top = 0;
  uploadErrorMessageContainer.style.width = '60%';
  uploadErrorMessageContainer.style.marginLeft = '20%';
  uploadErrorMessageContainer.style.borderRadius = '20px';
  uploadErrorMessageContainer.style.textAlign = 'center';
  uploadErrorMessageContainer.style.fontSize = '24px';
  uploadErrorMessageContainer.style.backgroundColor = 'red';
  uploadErrorMessageContainer.style.padding = '20px 10px';

  uploadErrorMessageContainer.textContent = message;

  document.body.append(uploadErrorMessageContainer);

  setTimeout(() => {
    uploadErrorMessageContainer.remove();
  }, MESSAGE_SHOW_TIME);
};

const sortMiniaturesByDescendingComments = (currentPicture, nextPicture) => nextPicture.comments.length - currentPicture.comments.length;

const debounce = (callback) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMOUT_DELAY);
  };
};

export {debounce, sortMiniaturesByDescendingComments, showUploadErrorMessage, FiltersParameters, isEscapeKey, shuffle};
