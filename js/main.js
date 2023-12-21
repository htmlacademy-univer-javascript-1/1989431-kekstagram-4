import { createLoader } from './api.js';
import { initEditPopup } from './form.js';
import { createUploadErrorMessage, bodyElement } from './util.js';
import { initFilters } from './filters.js';

createLoader((data) => {
  initFilters(data);
  initEditPopup();
}, (err) => {
  bodyElement.append(createUploadErrorMessage(err));
});
