import { Button } from "@shared/ui";
import styles from "./Header.module.css";

interface Props {
  name: string,
  leftRoom: () => void
}

export const Header = ({ name, leftRoom }: Props) => {

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