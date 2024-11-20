import { FaSpinner } from "react-icons/fa6";
import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <FaSpinner role="img"/>
    </div>
  )
}