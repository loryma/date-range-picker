import { useCallback } from 'react';
import styles from './PickerInput.module.scss';
import { STRINGS } from '../utils/dateUtils';

export default function({ inputValue, onToggle }) {
   
  const onClick = useCallback((e) => {
    e.stopPropagation();
    onToggle(true);
  }, [onToggle]);

  return (
    <div className={styles.inputWrapper}>
      <input 
        onClick={onClick} 
        value={inputValue} 
        readOnly
        placeholder={STRINGS.RANGE_PLACEHOLDER}
        className={styles.inputField}
      />
      <span className={styles.inputIcon}>
        <svg width="1em" height="1em" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true" focusable="false" aria-label="calendar" data-category="legacy">
          <path d="M1 4v8.5a.5.5 0 00.5.5H8c0-.128.049-.256.146-.354.555-.555.854-1.6.854-3.146a.5.5 0 01.621-.485l.119.03A2.623 2.623 0 0012.999 6.5V4h-12zm3-2h6V0h1v2h1.5A1.5 1.5 0 0114 3.5v3a3.623 3.623 0 01-4.015 3.603c-.064 1.245-.335 2.212-.831 2.898H12.5a.5.5 0 00.5-.5v-2a.5.5 0 011 0v2a1.5 1.5 0 01-1.5 1.5h-11a1.5 1.5 0 01-1.5-1.5v-9a1.5 1.5 0 011.5-1.5H3v-2h1v2zm5 4V5h1v1h2v1h-2v1H9V7H7v2h1v1H7v2H6v-2H4v2H3v-2H1V9h2V7H1V6h2V5h1v1h2V5h1v1h2zM6 9V7H4v2h2z"></path>
        </svg>
      </span>
    </div>
  );
};