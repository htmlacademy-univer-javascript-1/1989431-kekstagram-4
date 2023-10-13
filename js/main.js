const DESCRIPTION = [
  'Закат',
  'Цветы',
  'Море',
  'Горы',
  'Дружба',
  'Дети',
  'Лес',
  'Город',
  'Еда',
  'Зима',
  'Путешествие',
  'Парк',
  'Автомобиль',
  'Пляж',
  'Животные',
  'Архитектура',
  'Граффити',
  'Семья',
  'Музыка',
  'Спорт',
  'Дождь',
  'Кофе',
  'Небоскреб',
  'Заброшенное',
  'Вечеринка'
];


const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHORNAME = [
  'Чехов', 'Пушкин', 'Лермонтов'
];

const getRandomInt = (minNum, maxNum) => {
  minNum = Math.ceil(Math.min(minNum, maxNum));
  maxNum = Math.floor(Math.max(minNum, maxNum));
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};


const getNonRepeatingRandomInt = (minNum, maxNum) => {
  const passedNumbers = [];
  return function(){
    let currentNumber = getRandomInt(minNum, maxNum);
    while (passedNumbers.includes(currentNumber)){
      currentNumber = getRandomInt(minNum, maxNum);
    }
    passedNumbers.push(currentNumber);
    return currentNumber;
  };
};


const recieveCommentMessage = (messageCount) => {
  if (messageCount > 1) {
    const messageSentenceId = getNonRepeatingRandomInt(0, 5);
    return `${SENTENCES[messageSentenceId()]} ||| ${SENTENCES[messageSentenceId()]}`;
  }
  return `${SENTENCES[getRandomInt(0, 5)]}`;
};


const generateComments = (amount) => {
  const objectArray = [];
  const commentIdGenerator = getNonRepeatingRandomInt(0,1000);
  for (let i = 0; i < amount; i++){
    const obj = {
      id : commentIdGenerator(),
      avatar : `img/avatar-${getRandomInt(1,6)}.svg`,
      message : recieveCommentMessage(getRandomInt(1,2)),
      name : AUTHORNAME[getRandomInt(0,AUTHORNAME.length-1)]
    };
    objectArray.push(obj);
  }
  return objectArray;
};


/*Хорошая ли это практика создавать вот так через const????*/
const idGenerator = getNonRepeatingRandomInt(1,25);
const urlIdGenerator = getNonRepeatingRandomInt(1,25);
const descriptionIdGenerator = getNonRepeatingRandomInt(0,24);
/*Хорошая ли это практика создавать вот так через const????*/


const createObject = () => ({
  id : idGenerator(),
  url : `photos/${urlIdGenerator()}.jpg`,
  description : DESCRIPTION[descriptionIdGenerator()],
  likes : getRandomInt(15,199),
  comments : generateComments(getRandomInt(0,29))
});


Array.from({length : 25}, createObject);


