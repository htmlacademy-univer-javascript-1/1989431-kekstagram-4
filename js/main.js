import {getPhotos} from './data.js';
import { initEditPopup } from './form.js';
import {thumbnailsInit} from './thumbnails.js';

const photos = getPhotos();

thumbnailsInit(photos);

initEditPopup();
