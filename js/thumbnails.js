import {renderThumbnail} from './thumbnailrender.js';

const domPicturesCollection = document.querySelector('.pictures');


let pictures = null;
const PICTURE_SELECTOR = '.picture';


const getPictureTemplate = ({id, url, likes, comments}) => `<a href="#" data-id = ${id} class="picture">
  <img class="picture__img" src="${url}" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments">${comments.length}</span>
      <span class="picture__likes">${likes}</span>
    </p>
</a>`;


const onThumbnailsContainerClick = (evt) => {
  const targetElement = evt.target.closest(PICTURE_SELECTOR);
  if (targetElement){
    const id = targetElement.dataset.id;
    const [pictureById] = pictures.filter((picture) => picture.id === +id);
    renderThumbnail(pictureById);
  }
};

export const thumbnailsInit = (data) => {
  pictures = data.slice();
  if (pictures) {
    domPicturesCollection.insertAdjacentHTML('afterbegin', pictures.map((element) => getPictureTemplate(element)).join(''));
    domPicturesCollection.addEventListener('click', onThumbnailsContainerClick);
  }
};

