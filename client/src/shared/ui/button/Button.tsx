import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = ( { children, ...props }: Props) => {
  
  return (
    <button 
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  )
}