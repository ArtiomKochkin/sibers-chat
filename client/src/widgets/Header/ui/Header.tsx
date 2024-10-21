import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { LeftRoom } from "@features/LeftRoom";
import { IParams } from "@shared/types";
import styles from "./Header.module.scss";

interface Props {
  name: string,
  params: IParams
  toggleVisibility: () => void
}

export const Header = ({ name, params, toggleVisibility }: Props) => {

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button 
          className={styles.menu}
          onClick={() => toggleVisibility()}
        >
          <IoMdMenu />
        </button>
        <div className={styles.logo}>
          Online Chat
        </div>
      </div>
      <div className={styles.right}>
        <IoPersonCircleOutline className={styles.person}/>
        <div>{name}</div>
        <LeftRoom params={params}/>
      </div>
    </header>
  )
}