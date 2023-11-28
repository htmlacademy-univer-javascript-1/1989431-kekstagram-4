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
const COMMENTS_ADD_STEP = 5;
let pictureByIdComments;


const onPopupClose = () => {
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

  bigPictureCloseCross.removeEventListener('click',onPopupKeydown);
  commentsLoader.removeEventListener('click', () => {showNextFiveComments();});
  document.removeEventListener('keydown', onPopupClose);
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
  pictureByIdComments = pictureById.comments;
  commentsCount.textContent = pictureByIdComments.length;
  if (pictureByIdComments.length <= COMMENTS_ADD_STEP) {
    commentsContainer.insertAdjacentHTML('afterbegin', pictureByIdComments.map((comment) => getCommentTemplate(comment)).join(''));
    updateCommentsCount(pictureByIdComments.length);
    commentsLoader.classList.add('hidden');
  } else {
    const firstFiveComments = pictureByIdComments.slice(0, COMMENTS_ADD_STEP);
    commentsContainer.insertAdjacentHTML('afterbegin', firstFiveComments.map((comment) => getCommentTemplate(comment)).join(''));
    updateCommentsCount(5);
    commentsLoader.addEventListener('click', () => {showNextFiveComments();});
  }
};

function showNextFiveComments () {
  const currentCommentCount = commentsContainer.children.length;

  const nextFiveComments = pictureByIdComments.slice(currentCommentCount, currentCommentCount + 5);

  commentsContainer.insertAdjacentHTML('beforeend', nextFiveComments.map((comment) => getCommentTemplate(comment)).join(''));
  updateCommentsCount(commentsContainer.children.length);

  if (currentCommentCount + 5 >= pictureByIdComments.length) {
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

  document.addEventListener('keydown', onPopupClose);
  bigPictureCloseCross.addEventListener('click', onPopupClose);
};
