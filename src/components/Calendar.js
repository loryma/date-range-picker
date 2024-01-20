import { useCallback, useMemo } from "react";
import styles from './Calendar.module.scss';
import { 
  generateDaysArray,
  isDayInChosenRange, 
  isStartOrEndDay,
  isDayFromPreviousMonth,
  isWeekend,
  isToday
} from "../utils/dateUtils";
import CalendarHeader from './CalendarHeader';
import CalendarWeekDays from './CalendarWeekDays';

export default function Calendar({ 
  yearAndMonth, 
  onSetDate, 
  onMonthChange,
  startDate, 
  endDate,
  calendarLocation 
}) {

  const days = useMemo(() => {
    const daysNumbers = generateDaysArray(yearAndMonth);
    const { year, month } = yearAndMonth;
    const result = daysNumbers  
      .map((day) => {
        const isWeekendDay = isWeekend(year, month, day);
        const isPrevMonthDay = isDayFromPreviousMonth(day);
        const currentDay = isToday({ year, month, day });

        const className = [
          styles.day, 
          isDayInChosenRange({ year, month, day, startDate, endDate }) && styles.dayInRange,
          isStartOrEndDay({ year, month, day, startDate, endDate }) && styles.startOrEndDay,
          isPrevMonthDay && styles.dayFromPreviousMonth,
          isWeekendDay && styles.disabledDay,
          currentDay && styles.today
        ]
        .filter(Boolean)
        .join(" ");

        return { day, className, isWeekendDay, isPrevMonthDay };
      });

    return result;
  }, [yearAndMonth, startDate, endDate]);

  const onDateClick = useCallback((day) => {
    onSetDate({ ...yearAndMonth, day });
  }, [onSetDate, yearAndMonth]);

  return (
    <div className={styles.wrapper}>
      <CalendarHeader 
        yearAndMonth={yearAndMonth} 
        onMonthChange={onMonthChange}
        calendarLocation={calendarLocation}
      />
      <div className={styles.grid}>
        <CalendarWeekDays />
        {days.map(({ day, className, isWeekendDay, isPrevMonthDay }, index) => {
          return (
            <div 
              key={index} 
              className={className} 
              onClick={() => !isWeekendDay && !isPrevMonthDay && onDateClick(day)}>
                {day}
            </div>
          );
        })}
      </div>
    </div>
  )
};