import React, { useState, useCallback, useEffect } from 'react';
import Calendar from './Calendar';
import styles from './DaterangePicker.module.scss';
import { 
  getYearAndMonthFromDateObject, 
  getNextMonth,
  getPreviousMonth,
  CALENDARS,
  generateDateString,
  generateWeekendsArray 
} from '../utils/dateUtils';
import PredefinedDateRanges from './PredefinedDateRanges';

const DateRangePicker = ({ onRangeChoice, predefinedDateRanges }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leftCalendarYearAndMonth, setLeftCalendarYearAndMonth] = useState(getYearAndMonthFromDateObject(new Date()));
  const [rightCalendarYearAndMonth, setRightCalendarYearAndMonth] = useState(getNextMonth(getYearAndMonthFromDateObject(new Date())));

  const onSetDate = useCallback((date) => {
    const startDateObject = startDate && new Date(...Object.values(startDate));
    const endDateObject = endDate && new Date(...Object.values(startDate));
    const chosenDateObject = new Date(...Object.values(date));

    if (!startDate) {
      setStartDate(date);
      return;
    }

    if (startDate) {
      if (!endDate && chosenDateObject > startDateObject) {
        setEndDate(date);
        return;
      }
      if (!endDate && chosenDateObject < startDateObject) {
        setEndDate(startDate);
        setStartDate(date);
        return;        
      }

      if (+startDateObject === +chosenDateObject && +chosenDateObject === +endDateObject) {
        setEndDate(null);
        return;
      }

      if (+startDateObject === +chosenDateObject) {
        setEndDate(date);
        return;
      }

      if (endDate) {
        setEndDate(null);
        setStartDate(date);
      }
    }
    
  }, [setStartDate, setEndDate, startDate, endDate]);

  const onMonthChange = useCallback((yearAndMonth, calendar) => {
    if (calendar == CALENDARS.LEFT) {
      setLeftCalendarYearAndMonth(yearAndMonth);
      //make sure left calendar always shows at least one month yearlier then right calendar
      const { year, month } = rightCalendarYearAndMonth;
      if (yearAndMonth.year === year && yearAndMonth.month == month) {
        setRightCalendarYearAndMonth(getNextMonth(yearAndMonth));
      }

    } else {
      setRightCalendarYearAndMonth(yearAndMonth);

      const { year, month} = leftCalendarYearAndMonth;
      if (yearAndMonth.year === year && yearAndMonth.month == month) {
        setLeftCalendarYearAndMonth(getPreviousMonth(yearAndMonth));
      }
    }
  }, [
    setLeftCalendarYearAndMonth, 
    setRightCalendarYearAndMonth,
    leftCalendarYearAndMonth,
    rightCalendarYearAndMonth
  ]);

  useEffect(() => {
    let result;

    if (startDate && endDate) {
      const startRangeString = generateDateString(startDate);
      const endRangeString = generateDateString(endDate);
      const weekendsArray = generateWeekendsArray(startDate, endDate);
      result = [[ startRangeString, endRangeString ], weekendsArray];
    } else {
      result = [];
    }
    onRangeChoice(result);
  }, [startDate, endDate, onRangeChoice]);


  return (
    <div>
      <div className={styles.container}>
        <div className={styles.chosenDates}>
          {startDate && endDate 
            ? <p>{generateDateString(startDate)} ~ {generateDateString(endDate)}</p> 
            : <p>yyyy-MM-dd ~ yyyy-MM-dd</p>
          }
        </div>
        <div className={styles.calendarsWrapper}>
          <div>
            <Calendar
              onSetDate={onSetDate} 
              yearAndMonth={leftCalendarYearAndMonth}
              startDate={startDate}
              endDate={endDate}
              onMonthChange={onMonthChange} 
              calendarLocation={CALENDARS.LEFT}
            />
          </div>
          <div>
            <Calendar 
              onSetDate={onSetDate} 
              yearAndMonth={rightCalendarYearAndMonth}
              startDate={startDate}
              endDate={endDate} 
              onMonthChange={onMonthChange}
              calendarLocation={CALENDARS.RIGHT}
            />
          </div>
        </div>
        <PredefinedDateRanges 
          ranges={predefinedDateRanges}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;