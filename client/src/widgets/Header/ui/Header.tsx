import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { Button } from "@shared/ui";
import styles from "./Header.module.scss";

interface Props {
  name: string,
  toggleVisibility: () => void
  leftRoom: () => void
}

export const Header = ({ name, toggleVisibility, leftRoom }: Props) => {

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button 
          className={styles.menu}
          onClick={() => toggleVisibility()}
        >
          <IoMdMenu />
        </button>
        <div 
          className={styles.logo} 
          onClick={leftRoom}
        >
          Online Chat
        </div>
      </div>
      <div className={styles.right}>
        <IoPersonCircleOutline className={styles.person}/>
        <div>{name}</div>
        <Button onClick={leftRoom}>
          Left the room
        </Button>
      </div>
    </header>
  )
}