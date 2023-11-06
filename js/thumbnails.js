import { getPhotos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content;
const domPicturesCollection = document.querySelector('.pictures');

const picturesObjects = getPhotos();

const readyPhotosFragment = document.createDocumentFragment();

picturesObjects.forEach((pictureObj) => {
  const pictureTemplateClone = pictureTemplate.cloneNode(true);

  pictureTemplateClone.querySelector('.picture__img').src = pictureObj['url'];
  pictureTemplateClone.querySelector('.picture__img').alt = pictureObj['description'];

  pictureTemplateClone.querySelector('.picture__likes').textContent = pictureObj['likes'];
  pictureTemplateClone.querySelector('.picture__comments').textContent = pictureObj['comments'].length;

  readyPhotosFragment.appendChild(pictureTemplateClone);
});

domPicturesCollection.appendChild(readyPhotosFragment);
