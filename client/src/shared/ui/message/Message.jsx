import { useEffect, useState } from "react";
import styles from "./Message.module.css";
import { getNowDate } from "@shared/lib/utils";

export const Message = ({ message, styleMessage, name }) => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(getNowDate());
  }, [])

  return (
    <div className={`${styles.message} ${styleMessage}`}>
      <span className={styles.name}>{name}</span>
      <p>{message}</p>
      <div className={styles.date}>{date}</div>
    </div>
  )
}