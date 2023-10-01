const checkStringLength = (inputString, maxLength) => inputString.length <= maxLength;

const isPalindrome = (input) => {
  const formattedString = input.replaceAll(' ', '').toLowerCase();
  const reversedString = formattedString.split('').reverse().join('');
  return formattedString === reversedString;
};

const highlightNumber = (input) => {
  let resultNumber = '';
  for (const elem of String(input)){
    const parsedElem = parseInt(elem, 10);
    resultNumber += (!Number.isNaN(parsedElem)) ? parsedElem : '';
  }
  return resultNumber ? +resultNumber : NaN;
};

checkStringLength('проверяемая строка', 20); //true
checkStringLength('проверяемая строка', 10); //false

isPalindrome('топот'); //true
isPalindrome('Кекс'); //false

highlightNumber('2023 год'); //2023
highlightNumber('1 кефир, 0.5 батона'); //105
highlightNumber('а я томат'); //NaN
highlightNumber(1.5); //15


