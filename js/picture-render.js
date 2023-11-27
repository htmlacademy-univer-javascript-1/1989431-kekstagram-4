import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseCross = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsCurrentCount = bigPicture.querySelector('.comments-current-count');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const OnClosePopup = () => {
  closePopup();
};

const OnPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup (){
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  bigPictureCloseCross.removeEventListener('click',OnPopupKeydown);
  document.addEventListener('keydown', OnClosePopup);
  commentsLoader.classList.remove('hidden');
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


const updateCommentsCount = (count) => {
  commentsCurrentCount.textContent = count;
};


const setupComments = (pictureById) => {
  commentsCount.textContent = pictureById.comments.length;
  if (pictureById.comments.length <= 5) {
    commentsContainer.insertAdjacentHTML('afterbegin', pictureById.comments.map((comment) => getCommentTemplate(comment)).join(''));
    updateCommentsCount(pictureById.comments.length);
    commentsLoader.classList.add('hidden');
  } else {
    const firstFiveComments = pictureById.comments.slice(0, 5);
    commentsContainer.insertAdjacentHTML('afterbegin', firstFiveComments.map((comment) => getCommentTemplate(comment)).join(''));
    updateCommentsCount(5);
    commentsLoader.onclick = () => {showNextFiveComments(pictureById);};
  }
};

function showNextFiveComments (pictureById) {
  const currentCommentCount = commentsContainer.children.length;

  const nextFiveComments = pictureById.comments.slice(currentCommentCount, currentCommentCount + 5);

  commentsContainer.insertAdjacentHTML('beforeend', nextFiveComments.map((comment) => getCommentTemplate(comment)).join(''));
  updateCommentsCount(commentsContainer.children.length);

  if (currentCommentCount + 5 >= pictureById.comments.length) {
    commentsLoader.classList.add('hidden');
  }
}

const renderMainData = (pictureById) => {
  bigPictureImg.querySelector('img').src = pictureById.url;

  likesCount.textContent = pictureById.likes;
  socialCaption.textContent = pictureById.description;
};


export const renderBigPicture = (pictureById) => {
  renderMainData(pictureById);
  commentsContainer.innerHTML = '';
  setupComments(pictureById);

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', OnClosePopup);
  bigPictureCloseCross.addEventListener('click', OnClosePopup);
};
