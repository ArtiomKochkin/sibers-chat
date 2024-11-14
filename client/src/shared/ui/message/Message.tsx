import styles from "./Message.module.scss";

interface Props {
  message: string,
  name: string,
  styleMessage: string,
  time: string
}

export const Message = ({ message, styleMessage, name, time }: Props) => {

  return (
    <div className={`${styles.message} ${styleMessage}`}>
      <span className={styles.name}>{name}</span>
      <p>{message}</p>
      <div
        data-loki-test="ignore"
        className={styles.date}
      >
        {time}
      </div>
    </div>
  )
}