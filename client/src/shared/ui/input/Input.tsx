import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: Props) => {

  return (
    <input
      className={styles.input}
      {...props}
    />
  )
}