import { useCallback, useState, useRef, useEffect } from "react";
import { 
  generateDateString,
  generateWeekendsArray 
} from '../utils/dateUtils';
import styles from './DaterangePicker.module.scss';
import DateRangePopup from './DateRangePopup';
import PickerInput from './PickerInput';

function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    function handleClickOutside(event) {
      console.log('handle click', ref.current, event.target, ref.current.contains(event.target));
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export default function DateRangeInput({ onRangeChoice, predefinedDateRanges }) {
  const [isOpen, setIsOpen] = useState(false);
  const rangePickerRef = useRef();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const onToggle = useCallback((open) => {
    if (open) {
      setIsOpen(true);
      return;
    }
    setIsOpen(false);
  }, [setIsOpen]);

  useClickOutside(rangePickerRef, onToggle);

  const onFinalChoice = useCallback(() => {
    let result;

    if (startDate && endDate) {
      setInputValue(`${generateDateString(startDate)} ~ ${generateDateString(endDate)}`);
      const startRangeString = generateDateString(startDate);
      const endRangeString = generateDateString(endDate);
      const weekendsArray = generateWeekendsArray(startDate, endDate);
      result = [[ startRangeString, endRangeString ], weekendsArray];
      onRangeChoice(result);
      setIsOpen(false);
    } else {
      return;
    }
    
  }, [setInputValue, startDate, endDate, setIsOpen, onRangeChoice]);
  
  return (
    <div 
      ref={rangePickerRef} 
      className={styles.wrapper}
    >
      <PickerInput 
        inputValue={inputValue} 
        isOpen={isOpen} 
        onToggle={onToggle} 
      />
      {isOpen && (
        <div className={styles.popupContainer}>
          <DateRangePopup
            startDate={startDate} 
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onFinalChoice={onFinalChoice}
            predefinedDateRanges={predefinedDateRanges}
          />
        </div>
      )}
    </div>
  );
};