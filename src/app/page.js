"use client"
import styles from "./page.module.css";
import DateRangePicker from "../components/DateRangePicker";
import { predefinedDateRanges } from "../utils/constants";

export default function Home() {
  return (
    <main className={styles.main}>
      <DateRangePicker 
        onRangeChoice={(range) => console.log(range)} 
        predefinedDateRanges={predefinedDateRanges}
      />
    </main>
  );
};
