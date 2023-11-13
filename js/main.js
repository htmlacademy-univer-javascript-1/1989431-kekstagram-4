import {getPhotos} from './data.js';
import {thumbnailsInit} from './thumbnails.js';

const photos = getPhotos();

thumbnailsInit(photos);
