import { useCallback } from 'react';
import { 
  CALENDAR_MONTHS_ARRAY, 
  getPreviousMonth, 
  getNextMonth,  
} from '../utils/dateUtils';
import styles from './CalendarHeader.module.scss';

export default function CalendarHeader({ 
  onMonthChange, 
  yearAndMonth: { year, month },
  calendarLocation 
}) {
  const monthName = CALENDAR_MONTHS_ARRAY[month];

  const onLeftArrowClick = useCallback(() => 
    onMonthChange(getPreviousMonth({ year, month }), calendarLocation),
  [onMonthChange, year, month, calendarLocation]);

  const onRightArrowClick = useCallback(() => 
    onMonthChange(getNextMonth({ year, month }), calendarLocation),
  [onMonthChange, year, month, calendarLocation]);

  return (
    <div className={styles.calendarHeader}>
      <button 
        className={styles.calendarHeaderArrow}
        onClick={onLeftArrowClick}
      >
        <svg width="1em" height="1em" viewBox="0 0 12 32" fill="currentColor" aria-hidden="true" focusable="false" aria-label="angle left" data-category="legacy">
          <path d="M11.196 9.714a.612.612 0 01-.179.411l-7.018 7.018 7.018 7.018c.107.107.179.268.179.411s-.071.304-.179.411l-.893.893c-.107.107-.268.179-.411.179s-.304-.071-.411-.179L.981 17.555c-.107-.107-.179-.268-.179-.411s.071-.304.179-.411l8.321-8.321c.107-.107.268-.179.411-.179s.304.071.411.179l.893.893c.107.107.179.25.179.411z"></path>
        </svg>
      </button>
      <div className={styles.calendarHeaderText}>
        {monthName} {year}
      </div>
      <button 
        className={styles.calendarHeaderArrow}
        onClick={onRightArrowClick}
      >
        <svg width="1em" height="1em" viewBox="0 0 11 32" fill="currentColor" aria-hidden="true" focusable="false" aria-label="angle right" data-category="legacy">
          <path d="M10.625 17.143a.612.612 0 01-.179.411l-8.321 8.321c-.107.107-.268.179-.411.179s-.304-.071-.411-.179l-.893-.893a.582.582 0 01-.179-.411c0-.143.071-.304.179-.411l7.018-7.018L.41 10.124c-.107-.107-.179-.268-.179-.411s.071-.304.179-.411l.893-.893c.107-.107.268-.179.411-.179s.304.071.411.179l8.321 8.321a.617.617 0 01.179.411z"></path>
        </svg>
      </button>
    </div>
  );
};