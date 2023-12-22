import { thumbnailsInit, thumbnailsDestroy } from './thumbnails.js';
import { shuffle, debounce, sortMiniaturesByDescdendingComments } from './util.js';

const HIDDEN_CONTAINER_CLASS = 'img-filters--inactive';
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const MAX_COUNT_DISCUSSES_CARD = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let miniatures = null;
let activeFilter = Filter.DEFAULT;

const filterFinction = {
  [Filter.DEFAULT]: () => miniatures,
  [Filter.RANDOM]: () => shuffle(miniatures.slice()).slice(0, MAX_COUNT_DISCUSSES_CARD),
  [Filter.DISCUSSED]: () => miniatures.slice().sort(sortMiniaturesByDescdendingComments)
};

const onFiltersFormClick = (evt) =>{
  const id = evt.target.id;
  if(id && id !== activeFilter)
  {
    filtersForm.querySelector(`#${activeFilter}`).classList.remove(ACTIVE_FILTER_CLASS);
    evt.target.classList.add(ACTIVE_FILTER_CLASS);
    activeFilter = id;
    thumbnailsDestroy();
    thumbnailsInit(filterFinction[id]());
  }
};

export const initFilters = (data) =>{
  miniatures = data.slice();
  filtersContainer.classList.remove(HIDDEN_CONTAINER_CLASS);
  filtersForm.addEventListener('click', debounce(onFiltersFormClick));
  thumbnailsInit(miniatures);
};
