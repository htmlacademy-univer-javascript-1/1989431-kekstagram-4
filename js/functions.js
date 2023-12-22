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
highlightNumber(1.5); //


const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 3600;

const converTimeToSeconds = (timeStr) => parseInt(timeStr.split(':')[0],10) * SECONDS_IN_HOUR + parseInt(timeStr.split(':')[1],10) * SECONDS_IN_MINUTE;

const isMeetInTime = (workTimeStart, workTimeEnd, meetingStart, minutesMeetingDuration) => {
  const secondsWorkTimeStart = converTimeToSeconds(workTimeStart);
  const secondsWorkTimeEnd = converTimeToSeconds(workTimeEnd);
  const secondsMeetingStart = converTimeToSeconds(meetingStart);
  const meetingDurationInSeconds = minutesMeetingDuration * 60;
  return secondsMeetingStart + meetingDurationInSeconds >= secondsWorkTimeStart &&
    secondsMeetingStart + meetingDurationInSeconds <= secondsWorkTimeEnd;
};

isMeetInTime('08:00', '17:30', '14:00', 90);
isMeetInTime('8:0', '10:0', '8:0', 120);
isMeetInTime('08:00', '14:30', '14:00', 90);
isMeetInTime('14:00', '17:30', '08:0', 90);
isMeetInTime('8:00', '17:30', '08:00', 900);
