import { useEffect, useState } from "react";
import { getNowDate } from "@shared/lib/utils";
import styles from "./Message.module.scss";

interface Props {
  message: string,
  name: string,
  styleMessage: string
}

export const Message = ({ message, styleMessage, name }: Props) => {
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