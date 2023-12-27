import { loadData } from './api.js';
import { showUploadErrorMessage } from './util.js';
import { initFilters } from './filters.js';
import { setUserFormSubmit } from './form.js';

loadData()
  .then((data) => {
    initFilters(data);
  })
  .catch(
    (err) => {
      showUploadErrorMessage(err.message);
    }
  );

setUserFormSubmit();
