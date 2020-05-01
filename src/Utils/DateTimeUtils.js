const pad = (number) => (+number < 10 ? `0${number}` : number);
export const getCurrentDate = () => new Date();
const getWeekStr = (week) => {
  const weekNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return weekNames[week];
};
const getMonthStr = (month) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'DEC',
  ];
  return monthNames[month];
};
export const getDateString = (dateObj) =>
    `${dateObj.getDate()} ${getMonthStr(dateObj.getMonth())} ${getWeekStr(
        dateObj.getDay()
    )}`;
export const getTimeString = (dateObj) =>
    `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}:${dateObj.getSeconds()}`;
