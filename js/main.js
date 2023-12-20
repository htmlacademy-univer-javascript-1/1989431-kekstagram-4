import { createLoader } from './api.js';
import { initEditPopup } from './form.js';
import { thumbnailsInit } from './thumbnails.js';
import { bodyElement } from './data.js';
import { createUploadErrorMessage } from './util.js';

createLoader((data) => {
  thumbnailsInit(data);
  initEditPopup();
}, (err) => {
  bodyElement.append(createUploadErrorMessage(err));
});
