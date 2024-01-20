import { useCallback } from "react";
import { convertDateToYearMonthDay } from '../utils/dateUtils';
import styles from './PredefinedDateRanges.module.scss';

export default function PredefinedDateRanges({ ranges, setStartDate, setEndDate }) {
  
  const onClick = useCallback(([start, end]) => {
    const startDate = convertDateToYearMonthDay(start);
    const endDate = convertDateToYearMonthDay(end);

    setStartDate(startDate);
    setEndDate(endDate);
  }, [setEndDate, setStartDate]);
  
  return (
    <div className={styles.wrapper}>
      {ranges.map(({ value, label }) => {
        return (
          <div key={label} className={styles.range} onClick={() => onClick(value)}>
            {label}
          </div>
        )
      })}
    </div>
  );  
};