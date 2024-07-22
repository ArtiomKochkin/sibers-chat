import { IoMdClose } from "react-icons/io";
import styles from "./User.module.css";

export const User = ({user, isAdmin, removeUser }) => {

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