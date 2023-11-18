const isEscapeKey = (evt) => evt.key === 'Escape';

const bigPicture = document.querySelector('.big-picture');

const bigPictureCloseCross = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');

const onCloseThumbnail = () => {
  // eslint-disable-next-line no-use-before-define
  closeThumbnail();
};

const onBigThumbnailKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseThumbnail();
  }
};

const closeThumbnail = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onBigThumbnailKeydown);
  bigPictureCloseCross.removeEventListener('click',onCloseThumbnail);
  commentsLoader.classList.remove('hidden');

};

const getCommentsTemplate = ({avatar, name, message}) => `
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
  bigPicture.querySelector('.comments-current-count').textContent = count;

};


const setupComments = (pictureById) => {
  bigPicture.querySelector('.comments-count').textContent = pictureById.comments.length;
  if (pictureById.comments.length <= 5) {
    commentsContainer.insertAdjacentHTML('afterbegin', pictureById.comments.map((comment) => getCommentsTemplate(comment)).join(''));
    updateCommentsCount(pictureById.comments.length);
    commentsLoader.classList.add('hidden');
  } else {
    const firstFiveComments = pictureById.comments.slice(0, 5);
    commentsContainer.insertAdjacentHTML('afterbegin', firstFiveComments.map((comment) => getCommentsTemplate(comment)).join(''));
    updateCommentsCount(5);
    // eslint-disable-next-line no-use-before-define
    commentsLoader.onclick = () => {showNextFiveComments(pictureById);};
  }
};

const showNextFiveComments = (pictureById) => {
  const currentCommentCount = commentsContainer.children.length;

  const nextFiveComments = pictureById.comments.slice(currentCommentCount, currentCommentCount + 5);

  commentsContainer.insertAdjacentHTML('beforeend', nextFiveComments.map((comment) => getCommentsTemplate(comment)).join(''));
  updateCommentsCount(commentsContainer.children.length);

  if (currentCommentCount + 5 >= pictureById.comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

export const renderThumbnail = (pictureById) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img');
  bigPictureImg.querySelector('img').src = pictureById.url;

  bigPicture.querySelector('.likes-count').textContent = pictureById.likes;
  bigPicture.querySelector('.social__caption').textContent = pictureById.description;
  commentsContainer.innerHTML = '';
  setupComments(pictureById);


  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onBigThumbnailKeydown);
  bigPictureCloseCross.addEventListener('click',onCloseThumbnail);
};

