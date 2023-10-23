export const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getRandomIntFromInterval = (minNum, maxNum) => {
  minNum = Math.ceil(Math.min(minNum, maxNum));
  maxNum = Math.floor(Math.max(minNum, maxNum));
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};
