
export const CALENDARS = {
  LEFT: 'left',
  RIGHT: 'right'
};

export const WEEK_DAYS_ARRAY = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

// Calendar months names
export const CALENDAR_MONTHS_ARRAY = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct", 
  "Nov",
  "Dec"
];


export const getPreviousMonth = ({ year, month }) => {
  const prevMonth = (month > 0) ? month - 1 : 11;
  const prevMonthYear = (month > 0) ? year : year - 1;
  return { month: prevMonth, year: prevMonthYear };
};
  
export const getNextMonth = ({ month, year }) => {
  const nextMonth = (month < 11) ? month + 1 : 0;
  const nextMonthYear = (month < 11) ? year : year + 1;
  return { month: nextMonth, year: nextMonthYear };
};

// Generate array representing days of month
export const generateDaysArray = ({ year, month }) => {
  const daysInMonth = new Date(+year, +month + 1, 0).getDate();
  const firstDayOfMonthWeekDay = new Date(+year, +month, 1).getDay();
  //prepend white spaces for days of the previous month
  let days = [...[...Array(firstDayOfMonthWeekDay).keys()].map(i => " ")];
  console.log('dd', days);
  days
    .push(...[...Array(daysInMonth).keys()]
    .map(i => i + 1))
  return days;
};

export const getYearAndMonthFromDateObject = (date) => {
  return { year: date.getFullYear(), month: date.getMonth() };
};

export const convertDateToYearMonthDay = (date) => {
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
};

export const generateDateString = ({ year, month, day}) => 
  `${year}-${month}-${day}`; 

export const generateWeekendsArray = (startDate, endDate) => {
  let start = new Date(...Object.values(startDate));
  const end = new Date(...Object.values(endDate));
  const weekendsList = [];

    while (start < end) {
        const day = start.getDay();
        const isWeekend = (day === 6) || (day === 0); 
        if (isWeekend) { 
          const dayString = generateDateString(convertDateToYearMonthDay(start));
          weekendsList.push(dayString);
        } 
        start.setDate(start.getDate() + 1);
    }
    return weekendsList;
};

export const isDayInChosenRange = ({ year, month, day, startDate, endDate }) => {
  if (!startDate || !endDate || day === " " || isWeekend(year, month, day)) {
    return false;
  }
  const currentDate = new Date(year, month, day);
  const rangeStart = new Date(startDate.year, startDate.month, startDate.day);
  const rangeEnd = new Date(endDate.year, endDate.month, endDate.day);

  return (currentDate >= rangeStart) && (currentDate <= rangeEnd);
};

export const isStartOrEndDay = ({ year, month, day, startDate, endDate }) => {
  if (!startDate && !endDate) {
    return false;
  }

  if ((year === startDate?.year 
    && month === startDate?.month 
    && day === startDate?.day)
    || (year === endDate?.year 
      && month === endDate?.month 
      && day === endDate?.day)) {
    return true;
  }
  return false;
};

export const isDayFromPreviousMonth = (day) => (day === " ");

export const isWeekend = (year, month, day) => {
  const date = new Date(year, month, day).getDay();
  return date === 0 || date === 6;
};

export const isToday = ({ year, month, day }) => {
  const today = new Date();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  if (year === todayYear && month === todayMonth && day === todayDay) {
    return true;
  }

  return false;
}; 