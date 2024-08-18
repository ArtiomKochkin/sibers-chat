import { IoMdClose } from "react-icons/io";
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
      <span> {user.name} </span>
      {isAdmin && !user.isAdmin && (
        <div 
          className={styles.close} 
          onClick={() => removeUser(user.name)}
          title="Remove user"
        >
          <IoMdClose className={styles.icon}/>
        </div>
      )}
    </li>
  )
}