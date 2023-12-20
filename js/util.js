import { ErrorText } from './api.js';

export const bodyElement = document.querySelector('.body');

export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getRandomIntFromInterval = (minNum, maxNum) => {
  minNum = Math.ceil(Math.min(minNum, maxNum));
  maxNum = Math.floor(Math.max(minNum, maxNum));
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

export const isEscapeKey = (evt) => evt.key === 'Escape';


export const isPicture = (evt) => {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  const selectedFile = evt.target.files[0];

  if (!selectedFile) {
    return false;
  }

  const fileName = selectedFile.name;
  const fileExtension = fileName.split('.').pop().toLowerCase();

  return allowedExtensions.includes(fileExtension);
};

export const FilterParameter = {
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

export const createUploadErrorMessage = (err) => {
  const uploadErrorMessage = document.createElement('div');
  uploadErrorMessage.style.position = 'absolute';
  uploadErrorMessage.style.left = 0;
  uploadErrorMessage.style.top = 0;
  uploadErrorMessage.style.width = '60%';
  uploadErrorMessage.style.marginLeft = '20%';
  uploadErrorMessage.style.borderRadius = '20px';
  uploadErrorMessage.style.textAlign = 'center';
  uploadErrorMessage.style.fontSize = '24px';
  uploadErrorMessage.style.backgroundColor = 'red';
  uploadErrorMessage.style.padding = '20px 10px';
  uploadErrorMessage.textContent = `${ErrorText.GET_DATA} ${err}`;
  return uploadErrorMessage;
};
