import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseCross = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const onClosePopup = () => {
  closePopup();
};

const onPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup (){
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onPopupKeydown);
  bigPictureCloseCross.removeEventListener('click',onClosePopup);
}

const getCommentTemplate = ({avatar, name, message}) => `
    <li class="social__comment">
        <img
            class="social__picture"
            src="${avatar}"
            alt="${name}"
            width="35" height="35">
        <p class="social__text">${message.join(' ')}</p>
    </li>
`;

const renderMainData = (pictureById) => {
  bigPictureImg.querySelector('img').src = pictureById.url;

  bigPicture.querySelector('.likes-count').textContent = pictureById.likes;
  bigPicture.querySelector('.comments-count').textContent = pictureById.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictureById.description;
};

const renderComments = (pictureById) => {
  bigPicture.querySelector('.social__comments').innerHTML = '';
  bigPicture.querySelector('.social__comments').insertAdjacentHTML('afterbegin', pictureById.comments.map((comment) => getCommentTemplate(comment)).join(''));
};

export const renderBigPicture = (pictureById) => {
  renderMainData(pictureById);
  renderComments(pictureById);

  bigPicture.classList.remove('hidden');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupKeydown);
  bigPictureCloseCross.addEventListener('click', onClosePopup);
};

