import styles from './CalendarWeekDays.module.scss';
import { WEEK_DAYS_ARRAY } from '../utils/dateUtils';

export default function CalendarWeekDays() {
  return (
    <>
      {WEEK_DAYS_ARRAY.map((weekDay) => {
        return (
          <div key={weekDay} className={styles.calendarWeekDay}>
            {weekDay}
          </div>
        )
      })
      }
    </>
  );
};