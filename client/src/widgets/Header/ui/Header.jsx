import styles from "./Header.module.css";
import { Button } from "@shared/ui";

export const Header = ({ name, leftRoom }) => {

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={leftRoom}>Online Chat</div>
      <div className={styles.right}>
        <div>{name}</div>
        <Button onClick={leftRoom}>Left the room</Button>
      </div>
    </header>
  )
}