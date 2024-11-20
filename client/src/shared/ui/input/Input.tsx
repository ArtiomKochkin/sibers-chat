import { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isRect?: boolean,
  innerRef?: React.RefObject<HTMLInputElement>
}

export const Input = ({ isRect, ...props }: Props) => {

  return (
    <input
      className={`${styles.input} ${isRect && styles.rect}`}
      data-testid="input"
      {...props}
    />
  )
}