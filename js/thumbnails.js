const pictureTemplate = document.querySelector('#picture').content;
const domPicturesCollection = document.querySelector('.pictures');

let pictures = null;

export const thumbnailsInit = (data) => {
  pictures = data.slice();
  if (pictures){
    const readyPhotosFragment = document.createDocumentFragment();

    pictures.forEach((picture) => {
      const pictureTemplateClone = pictureTemplate.cloneNode(true);

      pictureTemplateClone.querySelector('.picture__img').src = picture['url'];
      pictureTemplateClone.querySelector('.picture__img').alt = picture['description'];

      pictureTemplateClone.querySelector('.picture__likes').textContent = picture['likes'];
      pictureTemplateClone.querySelector('.picture__comments').textContent = picture['comments'].length;

      readyPhotosFragment.appendChild(pictureTemplateClone);
    });

    domPicturesCollection.appendChild(readyPhotosFragment);
  }
};
