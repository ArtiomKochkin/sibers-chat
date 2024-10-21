import { IoMdClose } from "react-icons/io";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IUser } from "@shared/types";
import styles from "./User.module.scss";

interface Props {
  user: IUser,
  isAdmin: boolean,
  removeUser: (name: string) => void
}

export const User = ({user, isAdmin, removeUser }: Props) => {
  
  return (
    <li className={styles.user}>
      <div className={styles.info}>
        <IoPersonCircleOutline className={styles.person}/>
        <span> {user.name} </span>
      </div>
      {isAdmin && !user.isAdmin && (
        <div 
          className={styles.close} 
          onClick={() => removeUser(user.name)}
          title="Remove user"
        >
          <IoMdClose className={styles.remove}/>
        </div>
      )}
    </li>
  )
}