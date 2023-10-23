import {shuffle, getRandomIntFromInterval} from './util.js';

const COUNT_PHOTOS = 25;

const DESCRIPTIONS = [
  'Закат', 'Цветы', 'Море', 'Горы', 'Дружба', 'Дети', 'Лес', 'Город',
  'Еда', 'Зима', 'Путешествие', 'Парк', 'Автомобиль', 'Пляж', 'Животные', 'Архитектура',
  'Граффити', 'Семья', 'Музыка', 'Спорт', 'Дождь', 'Кофе', 'Небоскреб', 'Заброшенное', 'Вечеринка'
];


const SENTENCES = [
  ['Всё отлично!'],
  ['Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'],
  ['В целом всё неплохо. Но не всё.'],
  ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'],
  ['Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'],
  ['Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
];

const authorName = ['Чехов', 'Пушкин', 'Лермонтов', 'Державин', 'Булгаков'];

const AvatarId = {
  MIN : 1,
  MAX : 6,
};

const MessagesCount = {
  MIN : 1,
  MAX : 2,
};

const CommentsCount = {
  MIN : 0,
  MAX : 30,
};

const LikesCount = {
  MIN : 15,
  MAX : 200,
};

const getComment = (_, id) => ({
  id,
  avatar : `img/avatar-${getRandomIntFromInterval(
    AvatarId.MIN,
    AvatarId.MAX
  )}.svg`,
  message : (shuffle(SENTENCES)).slice(0, getRandomIntFromInterval(MessagesCount.MIN, MessagesCount.MAX)),
  name : authorName[getRandomIntFromInterval(0,authorName.length - 1)],
});

const getPhotoData = (_, id) => ({
  id : id + 1,
  url : `photos/${id + 1}.jpg`,
  description : DESCRIPTIONS[getRandomIntFromInterval(0, DESCRIPTIONS.length - 1)],
  likes : getRandomIntFromInterval(
    LikesCount.MIN,
    LikesCount.MAX
  ),
  comments : Array.from({length : getRandomIntFromInterval(
    CommentsCount.MIN,
    CommentsCount.MAX
  )}, getComment),
});

export const getPhotos = () => Array.from({length : COUNT_PHOTOS}, getPhotoData);