import { isEscapeKey} from './util.js';

const body = document.querySelector('body');

const bigPicture = body.querySelector('.big-picture');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');

const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsLoader = body.querySelector('.social__comments-loader');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsCurrentCount = bigPicture.querySelector('.comments-current-count');

const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

const COMMENTS_ADD_STEP = 5;

let pictureByIdComments;

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

const onPopupKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicturePopup();
  }
};

function closeBigPicturePopup (){
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupKeydown);
}

function openBigPicturePopup (pictureById) {
  renderMainData(pictureById);
  commentsContainer.innerHTML = '';
  setupComments(pictureById);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupKeydown);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicturePopup();
});

const updateCommentsCount = (count) => {
  commentsCurrentCount.textContent = count;
};

const updateCommentsDisplay = (comments, count) => {
  commentsContainer.insertAdjacentHTML('afterbegin', comments.map((comment) => getCommentTemplate(comment)).join(''));
  updateCommentsCount(count);
};

const showNextComments = (comments, step) => {
  const visibleComments = comments.slice(0, step);
  updateCommentsDisplay(visibleComments, visibleComments.length);
};

commentsLoader.addEventListener('click', () => {
  showNextFiveComments();
});

function setupComments (pictureById) {
  pictureByIdComments = pictureById.comments;
  commentsCount.textContent = pictureByIdComments.length;

  if (pictureByIdComments.length <= COMMENTS_ADD_STEP) {
    updateCommentsDisplay(pictureByIdComments, pictureByIdComments.length);
    commentsLoader.classList.add('hidden');
  } else {
    showNextComments(pictureByIdComments, COMMENTS_ADD_STEP);
  }
}

function showNextFiveComments () {
  const currentCommentCount = commentsContainer.children.length;

  const nextFiveComments = pictureByIdComments.slice(currentCommentCount, currentCommentCount + COMMENTS_ADD_STEP);

  commentsContainer.insertAdjacentHTML('beforeend', nextFiveComments.map((comment) => getCommentTemplate(comment)).join(''));
  updateCommentsCount(commentsContainer.children.length);

  if (currentCommentCount + COMMENTS_ADD_STEP >= pictureByIdComments.length) {
    commentsLoader.classList.add('hidden');
  }
}

function renderMainData (pictureById) {
  bigPictureImg.querySelector('img').src = pictureById.url;

  likesCount.textContent = pictureById.likes;
  socialCaption.textContent = pictureById.description;
}

export {openBigPicturePopup};
