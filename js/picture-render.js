import { isEscapeKey, bodyElement } from './util.js';

const COMMENTS_ADD_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseCross = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsCurrentCount = bigPicture.querySelector('.comments-current-count');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
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
  bodyElement.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  bigPictureCloseCross.removeEventListener('click',onPopupKeydown);
  commentsLoader.addEventListener('click', onShowNextCommentsButtonClick);
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
        <p class="social__text">${message}</p>
    </li>
`;


const updateCommentsCount = (count) => {
  commentsCurrentCount.textContent = count;
};


function onShowNextCommentsButtonClick (){
  showNextFiveComments();
}

const updateCommentsDisplay = (comments, count) => {
  commentsContainer.insertAdjacentHTML('afterbegin', comments.map((comment) => getCommentTemplate(comment)).join(''));
  updateCommentsCount(count);
};

const showNextComments = (comments, step) => {
  const visibleComments = comments.slice(0, step);
  updateCommentsDisplay(visibleComments, visibleComments.length);
  commentsLoader.addEventListener('click', onShowNextCommentsButtonClick);
};

const setupComments = (pictureById) => {
  pictureByIdComments = pictureById.comments;
  commentsCount.textContent = pictureByIdComments.length;

  if (pictureByIdComments.length <= COMMENTS_ADD_STEP) {
    updateCommentsDisplay(pictureByIdComments, pictureByIdComments.length);
    commentsLoader.classList.add('hidden');
  } else {
    showNextComments(pictureByIdComments, COMMENTS_ADD_STEP);
  }
};


function showNextFiveComments () {
  const currentCommentCount = commentsContainer.children.length;

  const nextFiveComments = pictureByIdComments.slice(currentCommentCount, currentCommentCount + COMMENTS_ADD_STEP);

  commentsContainer.insertAdjacentHTML('beforeend', nextFiveComments.map((comment) => getCommentTemplate(comment)).join(''));
  updateCommentsCount(commentsContainer.children.length);

  if (currentCommentCount + COMMENTS_ADD_STEP >= pictureByIdComments.length) {
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
